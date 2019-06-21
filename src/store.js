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
    publicKey: 'eyJhbGciOiJSUzI1NiIsImUiOiJBUUFCIiwiZXh0Ijp0cnVlLCJrZXlfb3BzIjpbInZlcmlmeSJdLCJrdHkiOiJSU0EiLCJuIjoib1ljOXVOcXpGZnJHWE1nWUhFdk1KMVkyd3BzY2VnSDhsVi1wcEQwNDhUZ2czaWJGZ0pFenZISkdjeWctWE92a082NDhteDRvSmdOU0ZqVnV3SzVEaHZ5dWRyd1dmeXlKM3RUT185M1FhZVJqSWt5dXc5TjhqRE1YMktFRlIxX1hHczcxQUhDcGJiYkNlNjFWRHpRRWYxNXpXclFCQVdqVllSNTNYTHpUajJMOTVIbTRCLWhZNFVCWk5hRXhMYUJFNHhTY0w3Y1JhQXZXN25vVGdhOGVPY1JOYWVUWFVacm1mZzk1RFJPQ1hJNGJXc2dVTjAtT0FkQjBpbVBiYTJwS2NmaVFnQjZaTEc2OVJEcjd6bXU1aVpoUzFDZEZmQWQ0OXI3UXdRdkNtNWlpY2JDcm8tX2pkM24zbGlPXzdGc1BBU1NtS2pFZ3h0bzUzQUpSTkFlS093In0=',
    privateKey: null,
    subject: ''
  },
  mutations: {
    publicKey(state, key) {
      state.publicKey = key;
    },
    privateKey(state, key) {
      state.privateKey = key;
    },
    user(state, user) {
      state.user = user;
    },
    subject(state, id) {
      state.subject = id;
    }
  },
  actions: {
    login() {
      // ...
    }
  }
})
