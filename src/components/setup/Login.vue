<template>
  <form @submit.prevent="send">
    <b-form-group>
      <p>
        <font-awesome-icon :class="{ 'text-muted' : step != 0}" icon="key"/>&emsp;
        <font-awesome-icon class="text-muted" icon="long-arrow-alt-right"/>&emsp;
        <font-awesome-icon :class="{ 'text-muted' : step != 1}" icon="user-lock"/>&emsp;
        <font-awesome-icon class="text-muted" icon="long-arrow-alt-right"/>&emsp;
        <font-awesome-icon :class="{ 'text-muted' : step != 2}" icon="user"/>&emsp;
        <font-awesome-icon class="text-muted" icon="long-arrow-alt-right"/>&emsp;
        <font-awesome-icon :class="{ 'text-muted' : step != 3}" icon="sign-in-alt"/>
      </p>

      <b-input-group>
        <b-button
          v-if="step > 0"
          @click="back()"
          variant="outline-danger"
          class="input-group-prepend"
        >
          <font-awesome-icon icon="chevron-left"/>
        </b-button>

        <div v-if="step == 0">
          <textarea-autosize
            placeholder="paste public key here"
            class="form-control"
            v-model="key.public"
          ></textarea-autosize>
        </div>

        <div v-if="step == 1">
          <textarea-autosize
            placeholder="paste private key here"
            class="form-control"
            v-model="key.private"
          ></textarea-autosize>
        </div>

        <div v-if="step == 2">
          <input type="text" placeholder="What is your name?" class="form-control" v-model="name">
        </div>

        <div v-if="step == 3">
          <input type="text" :placeholder="status+'...'" class="form-control" disabled>
        </div>
        <b-button v-if="loading" variant="outline-light" class="input-group-append">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </b-button>

        <b-button v-if="step < 3" @click="next()" variant="success" class="input-group-append">
          <font-awesome-icon icon="chevron-right"/>
        </b-button>
      </b-input-group>
    </b-form-group>
  </form>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
import settings from "@/settings.json";
import store from "@/store";

/**
 * convert string to ArrayBuffer
 * @param {String} str data to convert
 * @returns {ArrayBuffer} converted data
 */
function str2ab(str) {
  // string to array buffer
  var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

/**
 * convert ArrayBuffer to string. chars array required
 * @param {ArrayBuffer} arraybuffer to convert
 * @returns {String} converted data
 */
const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function ab2b64(arraybuffer) {
  var bytes = new Uint8Array(arraybuffer),
    i,
    len = bytes.length,
    base64 = "";

  for (i = 0; i < len; i += 3) {
    base64 += chars[bytes[i] >> 2];
    base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
    base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
    base64 += chars[bytes[i + 2] & 63];
  }

  if (len % 3 === 2) {
    base64 = base64.substring(0, base64.length - 1) + "=";
  } else if (len % 3 === 1) {
    base64 = base64.substring(0, base64.length - 2) + "==";
  }

  return base64;
}

/**
 * Create signature
 * @requires ab2b64 convert ArrayBuffer to string. chars array required
 * @requires str2ab() convert string to ArrayBuffer
 * @param {String} data data to sign
 * @param {String} key private key
 * @returns {Promise} then signature catch error
 */
function sign(data, key) {
  return new Promise((res, rej) => {
    crypto.subtle
      .importKey(
        "jwk",
        JSON.parse(atob(key)),
        {
          name: "RSASSA-PKCS1-v1_5",
          hash: {
            name: "SHA-256"
          }
        },
        true,
        ["sign"]
      )
      .then(privateKey => {
        return crypto.subtle.sign(
          {
            name: "RSASSA-PKCS1-v1_5"
          },
          privateKey,
          str2ab(data)
        );
      })
      .then(signature => res(signature))
      .catch(err => rej(err));
  });
}

export default {
  name: "say",
  props: {
    subject: String
  },
  computed: {
    key() {
      return store.state.key;
    },
    user() {
      return store.state.user;
    }
  },
  watch: {
    key(n, old) {
      // console.log("new key: ", n);
    },
    user(n, old) {
      // console.log("new user: ", n);
    }
  },
  data() {
    return {
      step: 0,
      loading: false,
      status: "",
      name: "nick",
      signature: ""
    };
  },
  mounted: function() {
    if (store.state.key.public == null || store.state.key.private == null) {
      console.log("create new keys...");
    }
  },
  methods: {
    back() {
      this.step--;
    },
    next() {
      this.step++;
      if (this.step >= 3) {
        sign(this.name, this.key.private)
          .then(signature => {
            // signature is a arraybuffer of the SubtleCrypto sign
            console.log("signature", ab2b64(signature));
            this.signature = ab2b64(signature);

            this.login();
          })
          .catch(function(err) {
            console.error(err);
          });
      }
    },
    register() {
      if (!this.loading) {
        this.loading = true;
        this.status = "register";
        axios
          .post(settings.APIURL + "user/register", {
            name: this.name,
            publicKey: this.key.public,
            sign: this.signature
          })
          .then(res => {
            this.loading = false;
            if (res.status == 200) {
              console.log("register result", res.data);
              // ...
            } else {
              console.log("register status", res.status);
            }
          })
          .catch(e => {
            console.log("register error:", e);
            this.loading = false;
            this.status = "failled";
          });
      }
    },
    login() {
      if (!this.loading) {
        this.loading = true;
        this.status = "login";
        axios
          .post(settings.APIURL + "user/login", {
            name: this.name,
            publicKey: this.key.public,
            sign: this.signature
          })
          .then(res => {
            this.loading = false;
            if (res.status == 200) {
              this.loading = false;
              this.status = "";
              console.log("login result", res.data);
              if (res.data.success) {
                console.log("loged in");
              } else {
                console.log("login failled");
                this.register();
              }
              this.users = res.data.users;
            } else {
              console.log("login status", res.status);
              this.loading = false;
              this.status = "failled";
            }
          })
          .catch(e => {
            console.log("login error:", e);
            this.loading = false;
            this.status = "failled";
          });
      }
    }
  }
};
</script>

<style scoped>
textarea,
textarea-autosize {
  width: 100%;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
</style>
