<template>
  <form @submit.prevent="send">
    <b-form-group>
      <div class="form-group">
        <div class="input-group mb-3">
          <!-- <b-button @click="sendMessage" variant="outline-danger" class="input-group-prepend">
            <font-awesome-icon icon="chevron-left"/>
          </b-button> -->

          <!-- <textarea-autosize id="say" class="form-control" v-model="message"></textarea-autosize> -->
          <input type="text" id="say" class="form-control" v-model="message" />

          <b-button @click="sendMessage" variant="success" class="input-group-append">
            <font-awesome-icon icon="chevron-right"/>
          </b-button>
        </div>
      </div>
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
  data() {
    return {
      message: "",
      socket: io(settings.APIDOMAIN)
    };
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
        sign: this.message + '-' + this.timestamp
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
