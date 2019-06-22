<template>
  <b-container>
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
        <Error></Error>
        <Chat></Chat>
      </b-col>

      <b-col lg="4">
        <GoLive></GoLive>
        <Login></Login>
      </b-col>
    </b-row>

    <b-row>
      <b-col v-for="o in streaming">
        <Watch :channel="o._id" uuid=""></Watch>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
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
      loading: false
    };
  },
  computed: {
    streaming() {
      return store.state.runtime.streaming;
    }
  },
  watch: {
    streaming(n, old) {
      // console.log("now streaming: ", n);
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
  }
};
</script>
