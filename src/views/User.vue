<template>
  <b-list-group>
    <div v-for="user of users">
      <User :user="user"></User>
    </div>
  </b-list-group>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
import User from "@/components/User.vue";
import settings from "@/settings.json";

export default {
  name: "user",
  components: {
    User
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
