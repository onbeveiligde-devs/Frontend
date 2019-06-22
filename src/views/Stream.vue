<template>
  <div>
    <b-input-group>
      <input type="text" v-model="channel" placeholder="channelname">

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
  computed: {
    channel() {
      return store.state.runtime.channel; 
    }
  },
  watch: {
    channel(n, old) {
      console.log("new channel: ", n);
    }
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
