<template>
  <div>
    <p>my channel: {{ channel }}</p>
    <video
      ref="video"
      v-bind="localStream"
      autoplay="1"
      style="max-width: 100%; border: 1px solid;"
    ></video>

    <b-button v-if="!play" @click="start($event)" variant="success" class="btn-lg btn-block">
      <font-awesome-icon icon="play"/>
    </b-button>

    <b-button v-if="play" @click="stop()" variant="danger" class="btn-lg btn-block">
      <font-awesome-icon icon="stop"/>
    </b-button>

    <a v-show="ready()" target="_new" :href="apiurl+'watch/'+channel">{{ channel }}</a>
  </div>
</template>

<script>
navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;
window.RTCPeerConnection =
  window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
window.RTCIceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;

function blobToBase64(blob, callback) {
  console.log("blob to base64");
  var reader = new FileReader();
  reader.onload = function() {
    var dataUrl = reader.result;
    var base64 = dataUrl.split(",")[2];

    if (base64 == null) {
      base64 = dataUrl.split(",")[1];
    }

    callback(base64);
  };
  reader.readAsDataURL(blob);
}

function ab2str(buf) {
  console.log("arrayBuffer to string");
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

function str2ab(str) {
  console.log("string to array buffer");
  var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

import io from "socket.io-client";
import axios from "axios";
// @ is an alias to /src
import settings from "@/settings.json";

import store from "@/store";

export default {
  name: "golive",
  computed: {
    localVideo() {
      return this.$refs.video;
    },
    channel() {
      return store.getters.channel;
    },
    apiurl() {
      return settings.APIURL;
    }
  },
  watch: {
    channel(n, old) {
      console.log("new channel: ", n);
    }
  },
  data() {
    return {
      socket: io(settings.APIDOMAIN),
      play: false,
      localStream: null,
      recorder: null,
      blobUrl: null,
      blobUrls: [],
      intervalMiliSec: store.state.stream.intervalSec * 1000
    };
  },
  mounted: function() {
    console.log("start video");
    navigator.mediaDevices
      .getUserMedia({
        video: {
          optional: [
            { minWidth: 320 },
            { minWidth: 640 },
            { minWidth: 1024 },
            { minWidth: 1280 },
            { minWidth: 1920 },
            { minWidth: 2560 }
          ]
        },
        audio: true
      })
      .then(stream => {
        this.localStream = stream;
        this.localVideo.srcObject = stream;
        this.localVideo.volume = 0;
      });
  },
  methods: {
    ready() {
      return store.state.stream.postIndex >= 1;
    },
    start() {
      this.play = true;
      if (!this.localStream) {
        console.error("no stream");
        return;
      }
      if (this.recorder) {
        console.warn("recorder already exist. reuse it.");
      } else {
        this.recorder = new MediaRecorder(this.localStream);
      }

      this.recorder.ondataavailable = function(event) {
        console.log("new event", event);

        console.log("postIndex", store.state.stream.postIndex);

        console.log("start playback type", event.data.type);

        var videoBlob = new Blob([event.data], { type: event.data.type });
        console.log("Blob size=" + videoBlob.size);

        // console.log("blob is", videoBlob);
        blobToBase64(videoBlob, function(base64) {
          console.log("de base64 van de blob is", base64);

          let URL = settings.APIURL + "upload/" + store.state.runtime.channel;
          let data = new FormData();

          data.append("blob_base64", base64);
          data.append(
            "blob_name",
            "video_" + store.state.stream.postIndex + ".webm"
          );
          data.append("blob_index", store.state.stream.postIndex);
          data.append("blob_sec", store.state.stream.postSec);

          console.log(URL, data);

          axios
            .post(URL, data)
            .then(response => {
              console.log("response", response);
            })
            .catch(error => {
              console.log("error", error);
            });
          store.commit("postIndex");
        });
      };

      this.recorder.start(this.intervalMiliSec);
      console.log("start recording");

      let data = {
        _id: store.state.user._id,
        sign: store.state.user._id + "-" + this.timestamp
      };
      console.log("say hi to server", data);
      this.socket.emit("HITOSERV", data);
    },

    stop() {
      if (this.recorder) {
        this.recorder.stop();
        console.log("stop recording");
        this.play = false;

        let data = {
          _id: store.state.user._id,
          sign: store.state.user._id + "-" + this.timestamp
        };
        console.log("say bye to server", data);
        this.socket.emit("BYETOSERV", data);
      }
    }
  }
};
</script>
