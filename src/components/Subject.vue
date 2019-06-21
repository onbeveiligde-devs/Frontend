<template>
  <div>
    {{ user.balance }}
    {{ user.publicKey }}
    {{ user.name }}
    {{ user._id }}

    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Cras justo odio
        <span class="badge badge-primary badge-pill">14</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Dapibus ac facilisis in
        <span class="badge badge-primary badge-pill">2</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Morbi leo risus
        <span class="badge badge-primary badge-pill">1</span>
      </li>
    </ul>

    <p v-for="(value, key) in user">
      <b>{{key}}:</b> {{value}}
    </p>
  </div>
</template>

<script>
// @ is an alias to /src
import store from "@/store";

export default {
  name: "message",
  props: {
    user: {}
  }
};
</script>

<style scoped>

</style>
