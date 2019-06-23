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

// import WebCrypto
const crypto = window.crypto || require("@trust/webcrypto");

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
  computed: {
    key() {
      return store.state.key.public;
    }
  },
  watch: {
    key(n, old) {
      // console.log("new key: ", n);
    }
  },
  mounted: function() {
    console.log('verify', {
      msg: this.msg, 
      sign: this.sign, 
      key: this.key
    })
    // verify
    verify(this.msg, this.sign, this.key)
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
