<template>
  <p>
    {{ timestamp }}
    <b>{{ author }}: </b>
    {{ msg }} 
    <font-awesome-icon v-show="vallid" icon="check" />
    <font-awesome-icon v-show="invalled" icon="exclamation-triangle" />
  </p>
</template>

<script>
// @ is an alias to /src
import store from "@/store";
import crypto from "@/crypto";

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
      invalled: false
    };
  },
  mounted: function() {
    this.verify();
  },
  methods: {
    verify() {
        let verified = auth.verify(
            this.msg, 
            this.sign
        );
        console.log('verify', [
            verified,
            this.msg
        ]);
        if (verified) {
            this.vallid = true;
            this.invalled = false;
        } else {
            this.vallid = false;
            this.invalled = true;
        }
    }
  }
};
</script>

<style scoped>

</style>
