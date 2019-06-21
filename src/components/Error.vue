<template>
  <div>
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="warning"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <p v-if="error.message">
        {{ error.message }}
      </p>
    </b-alert>
  </div>
</template>

<script>
import io from "socket.io-client";
// @ is an alias to /src
import settings from "@/settings.json";

export default {
  name: "error",
  data() {
    return {
      socket: io(settings.APIDOMAIN),
      error: {},
      loading: false,
      dismissSecs: 30,
      dismissCountDown: 0,
      showDismissibleAlert: false
    };
  },
  mounted: function() {
    this.listen();
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    listen() {
      this.socket.on("ERRTOCLIENT", data => {
        console.log("received error", data);
        this.error = data;
        this.showAlert();
      });
    }
  }
};
</script>

<style scoped>
</style>