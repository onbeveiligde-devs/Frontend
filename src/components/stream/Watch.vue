<template>
  <div>
    <p>time: {{ time }} buffer: {{ timeBuffer }} channel: {{ channel }}</p>

    <video ref="video" autoplay="1" style="max-width: 100%; border: 1px solid;">
      <source :src="apiurl + 'stream/' + channel" type="video/webm;">
    </video>

    <b-button v-if="!play" @click="start($event)" variant="success" class="btn-lg btn-block">
      <font-awesome-icon icon="play"/>
    </b-button>

    <b-button v-if="play" @click="stop()" variant="danger" class="btn-lg btn-block">
      <font-awesome-icon icon="stop"/>
    </b-button>
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
import settings from "@/settings.json";

export default {
  name: "watch",
  props: {
    channel: String
  },
  computed: {
    watchVideo() {
      return this.$refs.video;
    },
    apiurl() {
      return settings.APIURL;
    }
  },
  data() {
    return {
      time: "",
      timeBuffer: "",
      play: false
    };
  },
  mounted: function() {
    this.watchVideo.muted = true;
    this.watchVideo.play();

    setTimeout(() => {
      this.watchVideo.currentTime = this.watchVideo.buffered.end(0) - 1;
      this.play = true;
    }, 10000);

    this.watchVideo.ontimeupdate = function() {
      this.time = this.watchVideo.currentTime;
      this.timeBuffer =
        this.watchVideo.buffered.start(0) +
        " - " +
        this.watchVideo.buffered.end(0);
    };
  },
  methods: {
    start() {
      this.play = true;
      this.watchVideo.muted = false;
    },
    stop() {
      this.play = false;
      this.watchVideo.muted = true;
    }
  }
};
</script>
