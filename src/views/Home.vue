<template>
  <b-row>
    <b-col lg="3">
      <b-list-group v-for="user of users">
        <User :user="user"></User>
      </b-list-group>
    </b-col>
    <b-col lg="5">
      <Error></Error>
      <Chat></Chat>
    </b-col>
    <b-col lg="4">
      <GoLive></GoLive>
    </b-col>
  </b-row>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
import settings from "@/settings.json";
import User from "@/components/setup/User.vue";
import Chat from "@/components/chat/Chat.vue";
import Error from "@/components/chat/Error.vue";
import GoLive from "@/components/stream/GoLive.vue";

export default {
  name: "home",
  components: {
    Chat,
    Error,
    User,
    GoLive
  },
  data() {
    return {
      users: [],
      loading: false
    };
  },
  mounted: function() {
    this.load();
  },
  methods: {
    load() {
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
  }
};
</script>
