<template>
  <div>
    <b-input-group>
      <input type="text" v-model="channelName" placeholder="channelname">

      <b-button @click="goWatch()" variant="success" class="input-group-append">
        <font-awesome-icon icon="play"/>Watch
      </b-button>

      <b-button @click="goLive()" variant="primary" class="input-group-append">
        <font-awesome-icon icon="stream"/>Go Live
      </b-button>
    </b-input-group>
    <GoLive></GoLive>
  </div>
</template>

<script>
// @ is an alias to /src
import settings from "@/settings.json";
import GoLive from "@/components/GoLive.vue";
import store from "@/store";

export default {
  name: "stream",
  components: {
    GoLive
  },
  data() {
    return {
      channelName: 'mychannel'
    };
  },
  methods: {
    goWatch() {
      // settings.APIURL = "watch/" + this.channelName;
      store.commit('channel', this.channelName);
    },
    goLive() {
      // settings.APIURL = "golive/" + this.channelName;
      store.commit('channel', this.channelName);
    }
  }
};
</script>
