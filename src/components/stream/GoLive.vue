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
// ask for user media from browser
navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;
window.RTCPeerConnection =
  window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
window.RTCIceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;
// import packages
import io from "socket.io-client";
import axios from "axios";
// @ is an alias to /src
import settings from "@/settings.json";
import store from "@/store";
import blobToBase64 from "@/models/blobToBase64";
import ab2str from "@/models/ab2str";
import str2ab from "@/models/str2ab";
import ab2b64 from "@/models/ab2b64";
import sign from "@/models/sign";
// import WebCrypto
const crypto = window.crypto || require("@trust/webcrypto");

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
    },
    key() {
      return store.state.key;
    }
  },
  watch: {
    channel(n, old) {
      console.log("new channel: ", n);
    },
    key(n, old) {
      // console.log("new key: ", n);
    }
  },
  data() {
    return {
      socket: io(settings.APIDOMAIN),
      play: false,
      localStream: null,
      recorder: null,
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
        // console.log("new event", event);
        console.log("postIndex", store.state.stream.postIndex);
        console.log("start playback type", event.data.type);

        var videoBlob = new Blob([event.data], { type: event.data.type });
        console.log("Blob size=" + videoBlob.size);

        // console.log("blob is", videoBlob);
        blobToBase64(videoBlob, function(base64) {
          console.log("de base64 van de blob is", base64);

          let URL = settings.APIURL + "upload/" + store.state.runtime.channel;
          let formData = new FormData();

          formData.append("blob_base64", base64);
          formData.append(
            "blob_name",
            "video_" + store.state.stream.postIndex + ".webm"
          );
          formData.append("blob_index", store.state.stream.postIndex);
          formData.append("blob_sec", store.state.stream.postSec);

          console.log(URL, formData);

          // cryto / sign / integrity
          let signData = JSON.stringify({
            base64: base64,
            index: formData.get("blob_index"),
            name: formData.get("blob_name"),
            second: formData.get("blob_sec")
          });

          sign(signData, store.state.key.private)
            .then(signature => {
              // signature is a arraybuffer of the SubtleCrypto sign
              console.log("signature", ab2b64(signature));
              // --- post to server ---
              axios
                .post(URL, formData, {
                  headers: { signature: ab2b64(signature) }
                })
                .then(response => {
                  console.log("response", response);
                })
                .catch(error => {
                  console.log("error", error);
                });
            })
            .catch(function(err) {
              console.error(err);
            });
          store.commit("postIndex");
        });
      };

      this.recorder.start(this.intervalMiliSec);
      console.log("start recording");

      // say hi to server
      sign(store.state.user._id, this.key.private)
        .then(signature => {
          // signature is a arraybuffer of the SubtleCrypto sign
          console.log("say hi to server", ab2b64(signature));
          this.socket.emit("HITOSERV", {
            _id: store.state.user._id,
            sign: ab2b64(signature)
          });
        })
        .catch(function(err) {
          console.error(err);
        });
    },

    stop() {
      if (this.recorder) {
        this.recorder.stop();
        console.log("stop recording");
        this.play = false;

        // say bye to server
        sign(store.state.user._id, this.key.private)
          .then(signature => {
            // signature is a arraybuffer of the SubtleCrypto sign
            console.log("say bye to server", ab2b64(signature));
            this.socket.emit("BYETOSERV", {
              _id: store.state.user._id,
              sign: ab2b64(signature)
            });
          })
          .catch(function(err) {
            console.error(err);
          });
      }
    }
  }
};
</script>
