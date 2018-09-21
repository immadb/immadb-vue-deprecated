<template>
  <b-table
    :striped="true"
    :hover="true"
    :fields="boutsTableFields"
    :items="bouts"
    :show-empty="true"
    v-if="bouts"
  >
    <template slot="bout" slot-scope="data">
      <h6 class="m-0 text-center">
        <router-link :to="{ name: 'bouts.show', params: { slug: data.item.slug } }">
          {{ $utils.boutBilling(data.item) }}
        </router-link>
      </h6>
      <h6 class="m-0 text-center">
        {{ data.item.weight }}
      </h6>
      <h6 class="m-0 text-center">
        {{ data.item.format }}
      </h6>
      <h6 class="m-0 text-center" v-if="spoilers">
        {{ boutResult(data.item) }}
      </h6>
      <h6 class="m-0 text-center" v-if="spoilers">
        {{ boutTime(data.item) }}
      </h6>
    </template>

    <template slot="red-fighter" slot-scope="data">
      <bout-fighter
        :bout="data.item"
        :fighter="data.item.red_fighter"
        align="left"
        :spoilers="spoilers"
      />
    </template>

    <template slot="blue-fighter" slot-scope="data">
      <bout-fighter
        :bout="data.item"
        :fighter="data.item.blue_fighter"
        align="right"
        :spoilers="spoilers"
      />
    </template>
  </b-table>
</template>

<script>
import BoutFighter from './bout-fighter'

export default {
  components: {
    'bout-fighter': BoutFighter
  },
  props: {
    bouts: {
      required: true,
      type: Array
    },
    spoilers: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    boutsTableFields () {
      /** @todo Figure out why solutions here (https://stackoverflow.com/questions/49842860/how-to-hide-bootstrap-vue-table-header-row) won't work. */
      return [
        { key: 'match', class: 'align-middle text-center', thStyle: 'display: none;' },
        { key: 'red-fighter', class: 'align-top text-center', thStyle: 'display: none;' },
        { key: 'bout', class: 'align-top text-center', thStyle: 'display: none;' },
        { key: 'blue-fighter', class: 'align-top', thStyle: 'display: none;' }
      ]
    }
  },
  methods: {
    boutResult (bout) {
      return this.$utils.boutMethodSummary(bout)
    },
    boutTime (bout) {
      return this.$utils.boutTimeSummary(bout)
    }
  },
  mounted () {
    console.log('Show event bout table component mounted.')
  }
}
</script>
