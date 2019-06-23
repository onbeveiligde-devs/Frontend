<template>
  <div :alt="timestamp">
    <span>{{ new Date(timestamp).toISOString().slice(-13, -5) }}</span>
    <p>
      <b>{{ author }}:</b>
      {{ msg }}
      <font-awesome-icon v-show="vallid" icon="check"/>
      <font-awesome-icon v-show="invalled" icon="exclamation-triangle"/>
    </p>
  </div>
</template>

<script>
// @ is an alias to /src
import store from "@/store";
import verify from "@/models/verify";

export default {
  name: "message",
  props: {
    msg: String,
    author: String,
    sign: String,
    timestamp: String
  },
  data() {
    return {
      vallid: false,
      invalled: false,
      user: {}
    };
  },
  mounted: function() {
    // verify
    verify(this.msg, this.sign, this.user.publicKey)
      .then(success => {
        console.log("message verified", success);
        // this.vallid = true;
        // this.invalled = false;
      })
      .catch(err => {
        console.log("verifing message error", err);
        // this.vallid = false;
        // this.invalled = true;
      });
  }
};
</script>

<style scoped>
</style>
