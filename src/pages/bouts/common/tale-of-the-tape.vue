<template>
  <b-container class="tale-of-the-tape">
    <b-row>
      <b-col sm>
        <tale-of-the-tape-fighter :fighter="bout.fighter_1" :bout="bout" align="left"/>
      </b-col>

      <b-col cols="2">
        <b-media>
          <p class="m-0 text-center">{{ bout.pretty_billing }}</p>
          <p class="m-0 text-center">{{ bout.weight }}</p>
          <p class="m-0 text-center">{{ bout.format }}</p>
        </b-media>
      </b-col>

      <b-col sm>
        <tale-of-the-tape-fighter :fighter="bout.fighter_2" :bout="bout" align="right"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TaleOfTheTapeFighter from './tale-of-the-tape-fighter'

export default {
  components: {
    'tale-of-the-tape-fighter': TaleOfTheTapeFighter
  },
  props: {
    'bout': {
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .tale-of-the-tape {
    padding: 1em;
  }
</style>
