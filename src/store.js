import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      _id: '5d0b352796d70b4a80cad5e8',
      publicKey: 'eyJhbGciOiJSUzI1NiIsImUiOiJBUUFCIiwiZXh0Ijp0cnVlLCJrZXlfb3BzIjpbInZlcmlmeSJdLCJrdHkiOiJSU0EiLCJuIjoib1ljOXVOcXpGZnJHWE1nWUhFdk1KMVkyd3BzY2VnSDhsVi1wcEQwNDhUZ2czaWJGZ0pFenZISkdjeWctWE92a082NDhteDRvSmdOU0ZqVnV3SzVEaHZ5dWRyd1dmeXlKM3RUT185M1FhZVJqSWt5dXc5TjhqRE1YMktFRlIxX1hHczcxQUhDcGJiYkNlNjFWRHpRRWYxNXpXclFCQVdqVllSNTNYTHpUajJMOTVIbTRCLWhZNFVCWk5hRXhMYUJFNHhTY0w3Y1JhQXZXN25vVGdhOGVPY1JOYWVUWFVacm1mZzk1RFJPQ1hJNGJXc2dVTjAtT0FkQjBpbVBiYTJwS2NmaVFnQjZaTEc2OVJEcjd6bXU1aVpoUzFDZEZmQWQ0OXI3UXdRdkNtNWlpY2JDcm8tX2pkM24zbGlPXzdGc1BBU1NtS2pFZ3h0bzUzQUpSTkFlS093In0=',
      name: 'Teun Colin',
      balance: 0
    },
    key: {
      public: '',
      private: ''
    },
    runtime: {
      subject: '5d0b352796d70b4a80cad5e8',
      channel: '5d0b352796d70b4a80cad5e8',
      streaming: []
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
    streaming(state, streaming) {
      state.runtime.streaming = streaming;
    }
  },
  actions: {
    login() {
      // ...
    }
  }
})
