<template>
  <b-list-group-item @click="openChat(user._id)" class="list-group-item-action items-center">
    <font-awesome-icon icon="comment-dots"/>
    {{ user.name }}
    <b-badge variant="primary" class="badge-pill">{{ user.balance }}</b-badge>
  </b-list-group-item>
</template>

<script>
// @ is an alias to /src
import store from "@/store";

export default {
  name: "message",
  props: {
    user: {}
  },
  methods: {
    openChat(id) {
      store.commit('subject', id);
    }
  }
};
</script>

<style scoped>
textarea,
textarea-autosize {
  width: 100%;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
</style>
