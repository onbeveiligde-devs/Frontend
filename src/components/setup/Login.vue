<template>
  <form @submit.prevent="send">
    <b-form-group>
      <p>
        <font-awesome-icon :class="{ 'text-muted' : step != 0}" icon="key"/>&emsp;
        <font-awesome-icon class="text-muted" icon="long-arrow-alt-right"/>&emsp;
        <font-awesome-icon :class="{ 'text-muted' : step != 1}" icon="user-lock"/>&emsp;
        <font-awesome-icon class="text-muted" icon="long-arrow-alt-right"/>&emsp;
        <font-awesome-icon :class="{ 'text-muted' : step != 2}" icon="sign-in-alt"/>
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
            id="say"
            class="form-control"
            v-model="key.public"
          ></textarea-autosize>
        </div>

        <div v-if="step == 1">
          <textarea-autosize
            placeholder="paste private key here"
            id="say"
            class="form-control"
            v-model="key.private"
          ></textarea-autosize>
        </div>

        <div v-if="step == 2">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>

        <b-button v-if="step < 2" @click="next()" variant="success" class="input-group-append">
          <font-awesome-icon icon="chevron-right"/>
        </b-button>
      </b-input-group>
    </b-form-group>
  </form>
</template>

<script>
import axios from "axios";
import io from "socket.io-client";
// @ is an alias to /src
import settings from "@/settings.json";
import store from "@/store";
import crypto from "@/modules/create.crypto";

export default {
  name: "say",
  props: {
    subject: String
  },
  data() {
    return {
      step: 0,
      key: {
        public: null,
        private: null
      },
      socket: io(settings.APIDOMAIN)
    };
  },
  mounted: function() {
    const jwkPrivateKey = JSON.parse(
      atob(localStorage.getItem("exportedPrivateKey"))
    );
    const jwkPublicKey = JSON.parse(
      atob(localStorage.getItem("exportedPublicKey"))
    );
    if (jwkPrivateKey == null || jwkPublicKey == null) {
      console.log('create new keys');
    }
  },
  methods: {
    next() {
      this.step++;
      if (this.step > 3) {
        store.commit("");
      }
    },
    back() {
      this.step--;
    },
    send(e) {
      e.preventDefault();
      this.sendMessage();
    },
    sendMessage() {
      console.log("say", this.message);
      this.socket.emit("MSGTOSERV", {
        message: this.message,
        author: store.state.user._id,
        subject: this.subject,
        timestamp: Date.now(),
        sign: this.message + "-" + this.timestamp
      });
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
