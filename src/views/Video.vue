<template>
  <div id="video">
    <div>
      <video v-bind="video" ref="video" id="video" width="640" height="480" autoplay></video>
    </div>
  </div>
</template>

<script>
export default {
  name: "video",
  data() {
    return {
      video: {}
    };
  },
  mounted() {
    this.video = this.$refs.video;
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
    window.RTCPeerConnection =
      window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
    window.RTCIceCandidate =
      window.mozRTCIceCandidate || window.RTCIceCandidate;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.src = window.URL.createObjectURL(stream);
        this.video.play();
      });
    }
  },
  methods: {
    capture() {
      this.canvas = this.$refs.canvas;
      var context = this.canvas
        .getContext("2d")
        .drawImage(this.video, 0, 0, 640, 480);
      this.captures.push(canvas.toDataURL("image/png"));
    }
  }
};
</script>

<style>
body: {
  background-color: #f0f0f0;
}
#video {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#video {
  background-color: #000000;
}
#canvas {
  display: none;
}
li {
  display: inline;
  padding: 5px;
}
</style>
