<template>
  <b-container fluid>
    <b-row>
      <b-col lg="3">
        <b-list-group v-if="loading">
          <b-list-group-item>
            <div class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </b-list-group-item>
        </b-list-group>

        <b-list-group v-for="user in users">
          <User :user="user"></User>
        </b-list-group>
      </b-col>

      <b-col lg="5">
        <div v-if="browser">
          <b-alert
            v-model="browser"
            variant="danger"
            dismissible
          >The {{ browser }} browser is not supported. Please, use Firefox instead.</b-alert>
        </div>

        <Error></Error>
        <Chat></Chat>
      </b-col>

      <b-col lg="4">
        <GoLive></GoLive>
        <Login></Login>
      </b-col>
    </b-row>

    <div v-for="o in streaming">
      <vue-draggable-resizable
        :w="500"
        :h="300"
        @dragging="onDrag"
        @resizing="onResize"
        :parent="false"
      >
        <Watch :channel="o._id" uuid></Watch>
      </vue-draggable-resizable>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";
import VueDraggableResizable from "vue-draggable-resizable";
// @ is an alias to /src
import settings from "@/settings.json";
import store from "@/store";

import User from "@/components/setup/User.vue";
import Login from "@/components/setup/Login.vue";
import Chat from "@/components/chat/Chat.vue";
import Error from "@/components/chat/Error.vue";
import GoLive from "@/components/stream/GoLive.vue";
import Watch from "@/components/stream/Watch.vue";

export default {
  name: "home",
  components: {
    Chat,
    Error,
    User,
    Login,
    GoLive,
    Watch
  },
  data() {
    return {
      users: [],
      loading: false,
      width: 0,
      height: 0,
      x: 0,
      y: 0
    };
  },
  computed: {
    streaming() {
      return store.state.runtime.streaming;
    },
    browser() {
      return store.state.runtime.browser;
    }
  },
  watch: {
    streaming(n, old) {
      // console.log("now streaming: ", n);
    },
    browser(n, old) {
      console.log("now browser: ", n);
    }
  },
  mounted: function() {
    if (!this.loading) {
      this.loading = true;
      axios
        .get(settings.APIURL + "user")
        .then(res => {
          console.log("users result", res.data.users);
          this.loading = false;
          if (res.status == 200) {
            this.users = res.data.users;
            console.log("received users", res.data);
          } else {
            console.log("user status", res.status);
          }
        })
        .catch(e => {
          console.log("user error:", e);
          this.loading = false;
        });
    }
  },
  methods: {
    onResize: function(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    },
    onDrag: function(x, y) {
      this.x = x;
      this.y = y;
    }
  }
};
</script>
