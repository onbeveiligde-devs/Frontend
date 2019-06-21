<template>
  <div class="chat">
    <Error></Error>
    <Chat :subject="this.$route.params.subject"></Chat>
  </div>
</template>

<script>
// @ is an alias to /src
import Chat from '@/components/Chat.vue'
import Error from '@/components/Error.vue'

export default {
  name: 'home',
  components: {
    Chat,
    Error
  }
}
</script>
