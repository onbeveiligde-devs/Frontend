<template>
  <form @submit.prevent="send">
    <b-form-group>
      <!-- step overview -->
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
        <!-- back button -->
        <b-button
          v-if="step > 0"
          @click="back()"
          variant="outline-danger"
          class="input-group-prepend"
        >
          <font-awesome-icon icon="chevron-left"/>
        </b-button>

        <!-- public key -->
        <div v-if="step == 0">
          <textarea-autosize
            placeholder="paste public key here"
            class="form-control"
            v-model="key.public"
          ></textarea-autosize>
        </div>

        <!-- private key -->
        <div v-if="step == 1">
          <textarea-autosize
            placeholder="paste private key here"
            class="form-control"
            v-model="key.private"
          ></textarea-autosize>
        </div>

        <!-- name or copmmend -->
        <div v-if="step == 2">
          <input type="text" placeholder="What is your name?" class="form-control" v-model="name">
        </div>

        <!-- loading -->
        <div v-if="step == 3">
          <input type="text" :placeholder="status+'...'" class="form-control" disabled>
        </div>
        <b-button v-if="loading" variant="outline-light" class="input-group-append">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </b-button>

        <!-- next button -->
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
import str2ab from "@/models/str2ab";
import ab2b64 from "@/models/ab2b64";
import sign from "@/models/sign";
// import WebCrypto
const crypto = window.crypto || require("@trust/webcrypto");

export default {
  name: "login",
  /**
   * variables given from other components
   */
  props: {
    subject: String
  },
  /**
   * computed variables of this component
   */
  computed: {
    key() {
      return store.state.key;
    },
    user() {
      return store.state.user;
    }
  },
  /**
   * watch for changes and update computed variables of this component
   */
  watch: {
    key(n, old) {
      // console.log("new key: ", n);
    },
    user(n, old) {
      // console.log("new user: ", n);
    }
  },
  /**
   * variables of this component and for this component only
   */
  data() {
    return {
      step: 0,
      loading: false,
      status: "",
      name: "",
      signature: ""
    };
  },
  /**
   * if this component is created
   * then create or retrieve keys
   */
  mounted: function() {
    let jwkPrivateKey = localStorage.getItem("exportedPrivateKey");
    let jwkPublicKey = localStorage.getItem("exportedPublicKey");
    let jwkUser = localStorage.getItem("exportedUser");
    console.log("keys found in localStorage", {
      private: jwkPrivateKey,
      public: jwkPublicKey,
      user: JSON.parse(jwkUser)
    });

    if (jwkPrivateKey != null && jwkPublicKey != null && jwkUser != null) {
      console.log("retrieve keys from localtorage...");
      store.commit("privateKey", jwkPrivateKey);
      store.commit("publicKey", jwkPublicKey);
      store.commit("user", JSON.parse(jwkUser));
    } else if (
      crypto.subtle != undefined &&
      crypto.subtle.generateKey != undefined
    ) {
      console.log("create new keys...");

      // process vars
      let privateKey;
      let publicKey;
      let exportedPrivateKey;
      let exportedPublicKey;

      let privateBase64Key;
      let publicBase64Key;

      // generate keys
      crypto.subtle
        .generateKey(
          {
            name: "RSASSA-PKCS1-v1_5",
            // Consider using a 4096-bit key for systems that require long-term security
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256"
          },
          true,
          ["sign", "verify"]
        )
        .then(key => {
          // save the keys
          //returns a keypair object
          publicKey = key.publicKey;
          privateKey = key.privateKey;
        })
        .then(() => {
          // export private key to jwk
          return crypto.subtle.exportKey(
            "jwk", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
            privateKey //can be a publicKey or privateKey, as long as extractable was true
          );
        })
        .then(function(privateKeyJwk) {
          // save exported private key
          //returns the exported key data
          exportedPrivateKey = privateKeyJwk;
        })
        .then(() => {
          // export public key to jwk
          return crypto.subtle.exportKey(
            "jwk", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
            publicKey //can be a publicKey or privateKey, as long as extractable was true
          );
        })
        .then(function(publicKeyJwk) {
          // save exported public key
          //returns the exported key data
          exportedPublicKey = publicKeyJwk;
        })
        .then(() => {
          // save base 64 privatekey
          console.log("save base 64 privatekey");
          privateBase64Key = btoa(JSON.stringify(exportedPrivateKey));
          console.log(privateBase64Key);
          localStorage.setItem("exportedPrivateKey", privateBase64Key);
          store.commit("privateKey", privateBase64Key);
        })
        .then(() => {
          // save base 64 publickey
          console.log("save base 64 publickey");
          publicBase64Key = btoa(JSON.stringify(exportedPublicKey));
          console.log(publicBase64Key);
          localStorage.setItem("exportedPublicKey", publicBase64Key);
          store.commit("publicKey", publicBase64Key);
        })
        .catch(err => {
          console.log("create crypto error", err);
        });
    }
  },
  methods: {
    /**
     * Go back to the template / step
     */
    back() {
      this.step--;
    },
    /**
     * Go to the next template / step or
     * manage the login and register process
     */
    next() {
      this.step++;
      if (this.step >= 3) {
        sign(this.name, this.key.private)
          .then(signature => {
            // signature is a arraybuffer of the SubtleCrypto sign
            // console.log("signature", ab2b64(signature));
            this.signature = ab2b64(signature);

            this.login();
          })
          .catch(function(err) {
            console.error(err);
          });
      }
    },
    /**
     * Register new name, public key and signed name
     */
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
              localStorage.setItem("exportedUser", JSON.stringify(res.data.user));
              store.commit("user", res.data.user);
              this.status = "received";
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
    /**
     * Login with name, public key and signed name
     */
    login() {
      if (!this.loading) {
        this.loading = true;
        this.status = "login";
        axios
          .post(settings.APIURL + "user/login", {
            command: this.name,
            publicKey: this.key.public,
            sign: this.signature
          })
          .then(res => {
            this.loading = false;
            this.status = "";
            if (res.status == 200) {
              console.log("login result", res.data);
              if (res.data.success) {
                console.log("loged in");
                localStorage.setItem(
                  "exportedUser",
                  JSON.stringify(res.data.user)
                );
                store.commit("user", res.data.user);
                this.status = "loged in";
              } else {
                console.log("login failled");
                this.register();
              }
            } else {
              console.log("login status", res.status);
              this.register();
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
