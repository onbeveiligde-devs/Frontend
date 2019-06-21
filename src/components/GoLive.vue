<template>
  <div>
    <h3>GO WebM Live Streaming with Firefox: {{ channel }}</h3>

    <b-button @click="startVideo()" variant="success" class="input-group-append">
      <font-awesome-icon icon="play"/>Start Video
    </b-button>

    <b-button @click="startRecording()" variant="success" class="input-group-append">
      <font-awesome-icon icon="stream"/>Start Live
    </b-button>

    <b-button @click="Submit($event)" variant="success" class="input-group-append">
      <font-awesome-icon icon="stream"/>Vue Submit
    </b-button>

    <b-button @click="stopVideo()" variant="danger" class="input-group-append">
      <font-awesome-icon icon="stop"/>Stop Video
    </b-button>

    <b-button @click="stopRecording()" variant="danger" class="input-group-append">
      <font-awesome-icon icon="stream"/>Stop Live
    </b-button>

    <video
      ref="video"
      v-bind="localStream"
      autoplay="1"
      style="max-width: 100%; border: 1px solid;"
    ></video>

    <a v-if="watchDiv" target="_new" :href="watchDiv">{{ watchDiv }}</a>
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

// @ is an alias to /src
import settings from "@/settings.json";
import crypto from "@/crypto";
import axios from "axios";

export default {
  name: "golive",
  props: {
    channel: String
  },
  computed: {
    localVideo() {
      return this.$refs.video;
    }
  },
  data() {
    return {
      watchDiv: "",
      localStream: null,
      recorder: null,
      blobUrl: null,
      blobUrls: [],
      recordIndex: 0,
      postIndex: 0,
      postSec: 0,
      intervalSec: 5,
      intervalMiliSec: this.intervalSec * 1000
    };
  },
  methods: {
    Submit() {
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
        console.log('new event', event);

        console.log(
          "data available, recordIndex=",
          this.recordIndex,
          " start playback. type=",
          event.data.type
        );
        var videoBlob = new Blob([event.data], { type: event.data.type });
        console.log("Blob size=" + videoBlob.size);

        console.log("blob is", videoBlob);
        this.blobToBase64(
          videoBlob, 
          function (base64) 
          {
            console.log("de base64 van de blob is", base64);

            this.postSec = this.postIndex * this.intervalSec;
            let URL = settings.APIURL + 'upload/' + this.channel;
            let data = new FormData();

            data.append("blob_base64", base64);
            data.append("blob_name", "video_" + this.postIndex + ".webm");
            data.append("blob_index", this.postIndex);
            data.append("blob_sec", this.postSec);

            console.log(URL, data);

            axios
              .post(URL, data)
              .then(response => {
                console.log("response", response);
              })
              .catch(error => {
                console.log("error", error);
              });
              
            if (postIndex == 1) {
              this.watchDiv = 'watch/' + this.channel;
            }
            this.postIndex++;
          }
        );
      }

      this.recorder.start(this.intervalMiliSec);
      console.log("start recording");
    },

    stopRecording() {
      if (this.recorder) {
        this.recorder.stop();
        console.log("stop recording");
      }
    },

    blobToBase64(blob, callback) {
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
    },

    // Request the usermedia
    startVideo() {
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

    stopVideo() {
      if (this.localStream) {
        this.localVideo.pause();
        this.localVideo.srcDoc = "";

        this.localStream.stop();
        this.localStream = null;
      }
    },

    ab2str(buf) {
      // arrayBuffer to string
      return String.fromCharCode.apply(null, new Uint16Array(buf));
    },

    str2ab(str) {
      // string to array buffer
      var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
      var bufView = new Uint16Array(buf);
      for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return buf;
    }
  }
};
</script>
