<template>
  <b-list-group-item
    @click="openChat(user._id)"
    :class="{'active' : user._id == subject}"
    class="list-group-item-action items-center"
  >
    <font-awesome-icon icon="comment-dots"/>
    {{ user.name }}
    
    <b-badge v-if="streaming.includes(user._id)" variant="primary" class="badge-pill">
      <font-awesome-icon icon="stream"/>
    </b-badge>
  </b-list-group-item>
</template>

<script>
import io from "socket.io-client";
// @ is an alias to /src
import settings from "@/settings.json";
import store from "@/store";

export default {
  name: "message",
  props: {
    user: {}
  },
  data() {
    return {
      socket: io(settings.APIDOMAIN)
    };
  },
  computed: {
    subject() {
      return store.state.runtime.subject;
    },
    streaming() {
      return store.state.runtime.streaming;
    }
  },
  watch: {
    subject(n, old) {
      console.log("new subject: ", n);
    },
    streaming(n, old) {
      console.log("now streaming: ", n);
    }
  },
  mounted: function() {
    this.socket.on("ONLINE", data => {
      store.commit("online", data._id);
    });
    this.socket.on("OFFLINE", data => {
      store.commit("offline", data._id);
    });
  },
  methods: {
    openChat(id) {
      store.commit("subject", id);
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
