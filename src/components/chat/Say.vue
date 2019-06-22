<template>
  <form @submit.prevent="send">
    <b-form-group>
      <div v-if="loggedin" class="input-group mb-3">
        <input type="text" id="say" class="form-control" v-model="message">

        <b-button @click="sendMessage" variant="success" class="input-group-append">
          <font-awesome-icon icon="chevron-right"/>
        </b-button>
      </div>
      <Login v-if="!loggedin"></Login>
    </b-form-group>
  </form>
</template>

<script>
import axios from "axios";
import io from "socket.io-client";
// @ is an alias to /src
import settings from "@/settings.json";
import store from "@/store";
import Login from "../setup/Login.vue"

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
      socket: io(settings.APIDOMAIN)
    };
  },
  computed: {
    loggedin() {
      console.log('loggedin', store.getters.loggedin);
      console.log('user', [
        store.state.key,
        store.state.user
      ])
      return store.getters.loggedin;
    }
  },
  watch: {
    loggedin(n, old) {
      console.log("new channel: ", n);
    }
  },
  methods: {
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
