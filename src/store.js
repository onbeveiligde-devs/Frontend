import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    key: {
      public: null,
      private: null
    },
    runtime: {
      subject: null,
      channel: null,
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
      state.runtime.channel = user._id;
      state.runtime.subject = user._id;
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