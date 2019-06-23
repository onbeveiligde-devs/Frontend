<template>
  <form @submit.prevent="send" v-if="loggedin">
    <b-form-group>
      <div class="input-group mb-3">
        <input
          type="text"
          id="say"
          class="form-control"
          placeholder="Say something..."
          v-model="message"
        >

        <b-button @click="sendMessage" variant="success" class="input-group-append">
          <font-awesome-icon icon="chevron-right"/>
        </b-button>
      </div>
    </b-form-group>
  </form>
</template>

<script>
import io from "socket.io-client";
import axios from "axios";
// @ is an alias to /src
import settings from "@/settings.json";
import store from "@/store";
import Login from "../setup/Login.vue";
import ab2b64 from "@/models/ab2b64";
import sign from "@/models/sign";

export default {
  name: "say",
  props: {
    subject: String
  },
  components: {
    Login
  },
  data() {
    return {
      message: "",
      socket: io(settings.APIDOMAIN),
      loading: false
    };
  },
  computed: {
    loggedin() {
      return store.getters.loggedin;
    },
    key() {
      return store.state.key.private;
    }
  },
  watch: {
    loggedin(n, old) {
      // console.log("new channel: ", n);
    },
    key(n, old) {
      // console.log("new key: ", n);
    }
  },
  methods: {
    send(e) {
      e.preventDefault();
      this.sendMessage();
    },
    sendMessage() {
      console.log("say", this.message);
      sign(this.message, this.key)
        .then(signature => {
          // signature is a arraybuffer of the SubtleCrypto sign
          // console.log("say signature", ab2b64(signature));
          this.socket.emit("MSGTOSERV", {
            message: this.message,
            author: store.state.user._id,
            subject: this.subject,
            timestamp: Date.now(),
            sign: ab2b64(signature)
          }).catch(err => {
            console.log('socket error', err);
            this.sendMessage();
          });
        })
        .catch(function(err) {
          console.error(err);
        });
    },
    postMessage() {
      if (!this.loading) {
        this.loading = true;
        sign(this.message, this.key)
          .then(signature => {
            // signature is a arraybuffer of the SubtleCrypto sign
            // console.log("say signature", ab2b64(signature));
            axios
              .post(settings.APIURL + "chat/" + this.subject, {
                message: this.message,
                author: store.state.user._id,
                user: this.subject,
                timestamp: Date.now(),
                sign: ab2b64(signature)
              })
              .then(res => {
                console.log("message result", res.data.messages);
                this.loading = false;
                if (res.status == 200) {
                  this.messages = res.data.messages;
                  console.log("message posted", res.data);
                  this.$router.push('/');
                } else {
                  console.log("message status", res.status);
                }
              })
              .catch(e => {
                console.log("message error:", e);
                this.loading = false;
              });
          })
          .catch(function(err) {
            console.error(err);
          });
      }
    }
  }
};
</script>

<style scoped>
/* textarea,
textarea-autosize {
  width: 100%;
  box-sizing: border-box; // For IE and modern versions of Chrome
  -moz-box-sizing: border-box; // For Firefox
  -webkit-box-sizing: border-box; // For Safari
} */
</style>
