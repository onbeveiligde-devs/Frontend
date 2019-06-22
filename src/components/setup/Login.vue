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
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>

        <b-button v-if="step < 3" @click="next()" variant="success" class="input-group-append">
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
      socket: io(settings.APIDOMAIN),
      name: ""
    };
  },
  mounted: function() {
    if (store.state.key.public == null || store.state.key.private == null) {
      console.log("create new keys");
    }
  },
  methods: {
    register() {
      let data = {
        name: this.name,
        privateLey: this.key.private,
        publicKey: this.key.public
      };
      console.log("register", data);
    },
    login() {
      let data = {
        name: this.name,
        privateLey: this.key.private,
        publicKey: this.key.public
      };
      console.log("login", data);
    },
    next() {
      this.step++;
      if (this.step >= 3) {
        this.register();
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
textarea,
textarea-autosize {
  width: 100%;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
</style>
