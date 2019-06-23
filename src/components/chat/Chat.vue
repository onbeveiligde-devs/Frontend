<template>
  <div>
    <Say :subject="subject"></Say>
    <ul>
      <li v-if="loading">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </li>
      <li v-for="o of messages" :key="o._id">
        <Message :author="o.author" :msg="o.message" :sign="o.sign" :timestamp="o.timestamp"/>
      </li>
    </ul>
  </div>
</template>

<script>
import io from "socket.io-client";
import axios from "axios";
// @ is an alias to /src
import settings from "@/settings.json";
import Message from "./Message.vue";
import Say from "./Say.vue";
import store from "@/store";

export default {
  name: "chat",
  components: {
    Message,
    Say
  },
  data() {
    return {
      messages: [],
      loading: false,
      socket: io(settings.APIDOMAIN)
    };
  },
  computed: {
    subject() {
      return store.state.runtime.subject;
    }
  },
  watch: {
    subject(n, old) {
      console.log("new subject: ", n);
      this.load();
    }
  },
  mounted: function() {
    this.listen();
    this.load();
  },
  methods: {
    listen() {
      this.socket.on("MSGTOCLIENT", data => {
        console.log("received message", data);
        this.messages.push(data);
      });
    },
    load() {
      if (!this.loading) {
        this.loading = true;
        axios
          .get(settings.APIURL + "chat/" + this.subject)
          .then(res => {
            console.log("messages result", res.data.messages);
            this.loading = false;
            if (res.status == 200) {
              this.messages = res.data.messages;
              console.log("received messages");
            } else {
              console.log("messages status", res.status);
            }
          })
          .catch(e => {
            console.log("messages error:", e);
            this.loading = false;
          });
      }
    }
  }
};
</script>

<style scoped>
</style>