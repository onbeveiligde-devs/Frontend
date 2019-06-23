import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      _id: '5d0b352796d70b4a80cad5e8',
      public: 'eyJhbGciOiJSUzI1NiIsImUiOiJBUUFCIiwiZXh0Ijp0cnVlLCJrZXlfb3BzIjpbInZlcmlmeSJdLCJrdHkiOiJSU0EiLCJuIjoiellCMlBZZzB3T29PTnVmVjV6cXRHVXUwWkY3ZVF3MGZWdUJXcXdsS3VobHJjRXlleUdDSndzOEphcWlYRzVDelUzSXZpZk5Vd04weUVFTFJYdmVxNzdsc0ZzbnpkRFhXOHhTUnNFS281ZW1yVlcyXy1idl9TcGxIeTBsclBPN21tRlEwUGVraDEwNGtYMzQ3dzRFQzg3X29IaldkemctbEtuYzBlU0hobVF1eEVMTjJxYWJXb1ZRcUxJazE5dlItSmJ2SFJqN3lUc1VLVVVmQ08ybUxFdkpLT0g1eFc1SXpVWENpclNZNVhSRG9Zem85cm15dmFVV0VrT2JtYXEwNzRGdU1kZXVwTEVkT1FKVEl1cFVmQUNwUTlwcE9MMHZuaXBsdkVyTk00d2ZlNEhDM1RfWEpKdXJQOEpMdGtKcWQ0YXpxSmRCS21DcVBSNUJoRlZURzlRIn0=',
      name: 'Teun'
    },
    key: {
      public: 'eyJhbGciOiJSUzI1NiIsImUiOiJBUUFCIiwiZXh0Ijp0cnVlLCJrZXlfb3BzIjpbInZlcmlmeSJdLCJrdHkiOiJSU0EiLCJuIjoiellCMlBZZzB3T29PTnVmVjV6cXRHVXUwWkY3ZVF3MGZWdUJXcXdsS3VobHJjRXlleUdDSndzOEphcWlYRzVDelUzSXZpZk5Vd04weUVFTFJYdmVxNzdsc0ZzbnpkRFhXOHhTUnNFS281ZW1yVlcyXy1idl9TcGxIeTBsclBPN21tRlEwUGVraDEwNGtYMzQ3dzRFQzg3X29IaldkemctbEtuYzBlU0hobVF1eEVMTjJxYWJXb1ZRcUxJazE5dlItSmJ2SFJqN3lUc1VLVVVmQ08ybUxFdkpLT0g1eFc1SXpVWENpclNZNVhSRG9Zem85cm15dmFVV0VrT2JtYXEwNzRGdU1kZXVwTEVkT1FKVEl1cFVmQUNwUTlwcE9MMHZuaXBsdkVyTk00d2ZlNEhDM1RfWEpKdXJQOEpMdGtKcWQ0YXpxSmRCS21DcVBSNUJoRlZURzlRIn0=',
      private: 'eyJhbGciOiJSUzI1NiIsImQiOiJHSUx2RjQzTWhRb2w0ZVNyUGVaZ3lUaWZicTFtSTJkSVNxdDlpdThUeTdqR2VPR2F1dG5ROUx5UEtmcXI4MnpDQnYwQ3NKaW1qazZUN3g2WkxKT3JfdVlGXzMzZEhRcGk5aUdJOHhZd1lTUUtfS2lYa21rYkhVSEZMM2sxWWxJNGpRaldKbUJOV2dvSENxRGE3Z25RV1ZTVmtpemhBcmdaQWtTdnJKY2Utb3NVbG9ZN29aQ0JqWC0yWUJJOTZRWS1mbnlyRzFxTjlmc3p5LTBUY0YxMDJiek1ZZGZzanFTdTlMWERpRktNTTNBSHB1dHZ4ZHFJZ3UxbERHUVlhakw3TmNzZjZJRjRCSWRXeGJxS2hSZUozb21JTVJ2N3I4LUE0UHJJMmxHNWs1OU5vdXhWR2pXeEMxemFXTTBJTUJJeUFxVnhDLTVSNjBIUjZ1c0I1aEhLZ1EiLCJkcCI6IjdHakQ3OF9ndFAyT2toOWVQX05HTEZReXNtLWNHX3JSOGZKQWQ1enNXbkNCUG5BVlhzd2N4UGFpSjNhVVVSNHkyaFk2cDcxSDhzWktQUHJScE43NXlyRHFKMmpHNi1kdWIwWTM0bE01d1lVcWVKSGZVdmoxOWlpaG9FWW5Eekd0M0l5cXlLVnEtcHNyYzNDc0ZVVHZ3LVJOVWdqZUxnRFpyTXFMY0xOY1R5RSIsImRxIjoidUN3QWVIeUlhUGpValZKb2NCU3NQTnpYWXRFRlVsWGVkcWw2SzBtUGJpOERULWVFRGlzV3V1Y0xhWlEwUzBRWDdCOWxLVThwRGx3NmlENXJIUHJlS0ZYMmRFWWJTYUtHLWFzNjVZTERzY3k5WmN3TjZoRmdrYkx3NVlBYmRNZzF1SkNXUVBlb0pYZGNubXZTQXZycjBMeWtBNGJvbW1IZG5FNU5uLVdhY1kwIiwiZSI6IkFRQUIiLCJleHQiOnRydWUsImtleV9vcHMiOlsic2lnbiJdLCJrdHkiOiJSU0EiLCJuIjoiellCMlBZZzB3T29PTnVmVjV6cXRHVXUwWkY3ZVF3MGZWdUJXcXdsS3VobHJjRXlleUdDSndzOEphcWlYRzVDelUzSXZpZk5Vd04weUVFTFJYdmVxNzdsc0ZzbnpkRFhXOHhTUnNFS281ZW1yVlcyXy1idl9TcGxIeTBsclBPN21tRlEwUGVraDEwNGtYMzQ3dzRFQzg3X29IaldkemctbEtuYzBlU0hobVF1eEVMTjJxYWJXb1ZRcUxJazE5dlItSmJ2SFJqN3lUc1VLVVVmQ08ybUxFdkpLT0g1eFc1SXpVWENpclNZNVhSRG9Zem85cm15dmFVV0VrT2JtYXEwNzRGdU1kZXVwTEVkT1FKVEl1cFVmQUNwUTlwcE9MMHZuaXBsdkVyTk00d2ZlNEhDM1RfWEpKdXJQOEpMdGtKcWQ0YXpxSmRCS21DcVBSNUJoRlZURzlRIiwicCI6Ijk0ZE14QllKNEdrYjUzZnNBWFpWZ0lzZVdIMmFmcTAzT3FfZU5XVTZ0VWJVLVU5cjE2V1VFbElELWMxOUdOTGthQkYxY3k4YUxnVkw1dGZhRTdsZXNVS0FXZHYyQmYwME1ieHNTV3NpdU9xLW8xUDZUMjk3akhJc1ZJZUpldFBGbXVwMHFHeHA5aXNmMFdSUHRsSDltMUNVa2xSb2xTblRoRUdtLWRDelB5RSIsInEiOiIxSWp5MDNhZ0t0anBQYk8xcTFjZmN0SnFCNmZ2NVRoa0lQRkNSYUFtZWlCS2trb1pLMzNSN2tHbkFyd0c1MHR6b1NLODhQZlVQdHlvb05kT09yb2FkUG9SSE0xMktTREFhUE5VekhxMDRYcmRRdG9oQ0l4TEU3Z2ZPMUowcDk0S2M5VXJ4ZGNzZTZ3dTQ0SXAxZWtvaE1oVF9VRWlGc1o1LXd6VEFrekxzVlUiLCJxaSI6IklMcndSV0laNXRMYzN4YkxJRWxLTFRQXzQ0U1ZScFk2elNiSTI1WU9kb2Qwc0doSUZmUUV6QWJEQVJCN3dCa2psekhlTmVPMUhoVC1OUGlLQ3NUZG16clRGMkx3azB6OWdWR29qNkF5M3R4N0tOclI2RXhLNWp0NTFBVl9jUTFKRDY2LXJIV1dpcUJNeHFKZk1LN1ZZNXJQbHA4bzRRdGRZQjZzUVVwRm5EYyJ9'
    },
    runtime: {
      subject: '5d0b352796d70b4a80cad5e8',
      channel: '5d0b352796d70b4a80cad5e8',
      streaming: [],
      browser: ''
    },
    stream: {
      postIndex: 0,
      intervalSec: 5,
      postSec: 0
    }
  },
  getters: {
    channel: state => {
      console.log('get channel', state.runtime.channel);
      return state.runtime.channel;
    },
    loggedin: state => {
      return state.key.public != null &&
        state.key.private != null &&
        state.key.public != '' &&
        state.key.private != '' &&
        state.user != null;
    }
  },
  mutations: {
    publicKey(state, key) {
      state.key.public = key;
    },
    privateKey(state, key) {
      state.key.private = key;
    },
    user(state, user) {
      state.user = user;
    },
    subject(state, id) {
      state.runtime.subject = id;
    },
    postIndex(state) {
      state.stream.postIndex++;
    },
    postSec(state) {
      state.stream.postSec = state.postIndex * state.intervalSec;
    },
    channel(state, channel) {
      state.runtime.channel = channel;
    },
    online(state, streaming) {
      if (!state.runtime.streaming.includes(streaming)) {
        state.runtime.streaming.push(streaming);
        console.log('streaming', state.runtime.streaming);
      }
    },
    offline(state, streaming) {
      let array = state.runtime.streaming;
      var index = array.indexOf(streaming);
      if (index !== -1) {
        state.runtime.streaming.splice(index, 1);
      }
      console.log('streaming', state.runtime.streaming);
    },
    browser(state, browser) {
      console.log('browser', browser);
      if (browser != 'firefox') {
        state.runtime.browser = browser;
      }
    }
  },
  actions: {
    login() {
      // ...
    }
  }
})