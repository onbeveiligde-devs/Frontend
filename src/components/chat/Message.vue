<template>
  <p>
    {{ timestamp }}
    <b>{{ author }}:</b>
    {{ msg }}
    <font-awesome-icon v-show="vallid" icon="check"/>
    <font-awesome-icon v-show="invalled" icon="exclamation-triangle"/>
  </p>
</template>

<script>
// @ is an alias to /src
import store from "@/store";

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
      if (true) {
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
