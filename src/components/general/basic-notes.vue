<template>
  <ul>
    <li class="note" v-for="note in notes">{{ note.content }}</li>
  </ul>
</template>

<script>
export default {
  props: {
    'notes': {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  ul {
    margin-bottom: 0;
  }
  // li.note:not(:last-child) {
  //   margin-bottom: 0.75em;
  // }
</style>
