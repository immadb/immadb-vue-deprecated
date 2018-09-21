<template>
  <basic-card>
    <template slot="header">
      <tale-of-the-tape :bout="bout" />
    </template>
    <basic-tabs>
      <b-tab title="Details" active>
        <b-media no-body>
          <b-media-aside vertical-align="top">
            <b-img rounded blank blank-color="lightgray" class="mr-4" :alt="bout.title" height="500" width="500" />
          </b-media-aside>
          <b-media-body>
            <description-list :items="detailItems" />
          </b-media-body>
        </b-media>
      </b-tab>
      <b-tab title="Common Bouts" v-if="hasCommonBouts">
        <!-- <bout-entry
          v-for="bout in bout.common_bouts"
          :key="bout.id"
          :bout="bout"
          :spoilers="true"
        /> -->
        <b-table
          :striped="true"
          :hover="true"
          :fields="boutTableFields"
          :items="bout.common_bouts"
          :show-empty="true"
        >
          <!-- @todo These two fighter slots are more or less the same.  Refactoring is likely in order. -->
          <template slot="red_fighter" slot-scope="data">
            <p>
              <router-link :to="$utils.personRoute(data.item.red_fighter)">
                {{ data.item.red_fighter.full_name }}
              </router-link>
              <b-badge :variant="$utils.boutResultVariant(data.item, data.item.red_fighter)">{{ $utils.boutFighterResult(data.item, data.item.red_fighter) }}</b-badge>
            </p>
            <p>
              {{ data.item.red_fighter.pretty_prefight_record }}
            </p>
          </template>

          <template slot="blue_fighter" slot-scope="data">
            <p>
              <b-badge :variant="$utils.boutResultVariant(data.item, data.item.blue_fighter)">{{ $utils.boutFighterResult(data.item, data.item.blue_fighter) }}</b-badge>
              <router-link :to="$utils.personRoute(data.item.blue_fighter)">
                {{ data.item.blue_fighter.full_name }}
              </router-link>
            </p>
            <p>
              {{ data.item.blue_fighter.pretty_prefight_record }}
            </p>
          </template>

          <template slot="event_and_results" slot-scope="data">
            <p class="m-0">
              <router-link :to="$utils.eventRoute(data.item.event)">
                {{ $utils.eventFullTitle(data.item.event) }}
              </router-link>
            </p>
            <p class="m-0">{{ data.item.event.date }}</p>
            <router-link :to="$utils.boutRoute(data.item)">
              {{ $utils.boutWeight(data.item) }} | {{ $utils.boutBilling(data.item) }}
            </router-link>
            <p class="m-0">
              {{ $utils.boutMethodSummary(data.item) }}
            </p>
            <p class="m-0">
              {{ data.item.time }} Round {{ data.item.round }}
            </p>
          </template>
        </b-table>
      </b-tab>
      <b-tab title="Results" v-if="isBoutFinished">
        <description-list :items="resultItems" />
      </b-tab>
      <!-- <b-tab title="Discussions"> -->
        <!-- <discussions if="bout.discussions" :discussions="bout.discussions" /> -->
      <!-- </b-tab> -->
      <b-tab v-if="hasNotes" title="Notes">
        <basic-notes :notes="bout.notes" />
      </b-tab>
    </basic-tabs>
  </basic-card>
</template>

<script>
import BasicCard from '@/components/general/basic-card'
import BasicTabs from '@/components/general/basic-tabs'
import BoutEntry from '@/pages/common/bout-entry'
import DescriptionList from '@/components/general/description-list'
// import Discussions from '@/components/general/discussion-index'
import BasicNotes from '@/components/general/basic-notes'
import TaleOfTheTape from './tale-of-the-tape'

export default {
  components: {
    'basic-card': BasicCard,
    'basic-tabs': BasicTabs,
    'bout-entry': BoutEntry,
    'description-list': DescriptionList,
    // 'discussions': Discussions,
    'basic-notes': BasicNotes,
    'tale-of-the-tape': TaleOfTheTape
  },
  props: {
    'bout': {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      showResults: false
    }
  },
  computed: {
    boutTableFields () {
      return [
        { key: 'red_fighter', class: 'align-middle text-center' },
        { key: 'event_and_results', class: 'align-middle text-center', label: 'Event/Results' },
        // { key: 'event_and_results', class: 'align-middle text-center', thStyle: 'width: 16.66%', label: 'Event/Results' },
        { key: 'blue_fighter', class: 'align-middle text-center' }
      ]
    },
    detailItems () {
      return [
        { term: 'Event', description: this.$utils.eventFullTitle(this.bout.event), route: this.$utils.eventRoute(this.bout.event) },
        { term: 'Date/Time', description: this.bout.event.full_date_full_time },
        { term: 'Weight', description: this.$utils.boutWeight(this.bout) },
        { term: 'Referee', description: this.bout.referee ? this.bout.referee.complete_name : 'n/a', route: this.$utils.personRoute(this.bout.referee) },
        { term: 'Venue', description: this.bout.event.venue },
        { term: 'Location', description: this.bout.event.location },
        { term: 'Billing', description: this.$utils.boutBilling(this.bout) + ` (${this.bout.match} of ${this.bout.event.bouts_count})` },
        { term: 'Type', description: this.$utils.boutType(this.bout) }
        // { term: 'Judges', description: this.bout.judges.map(judge => judge.complete_name).join(' | ') }
      ]
    },
    hasCommonBouts: (t) => !!t.bout.common_bouts,
    hasNotes: (t) => Array.isArray(t.bout.notes) && t.bout.notes.length,
    isBoutFinished: (t) => t.bout.status === 'finished',
    resultItems () {
      return [
        {
          term: 'Winner',
          description: this.bout.winner ? this.bout.winner.complete_name : 'n/a',
          route: this.$utils.personRoute(this.bout.winner)
        },
        { term: 'Method', description: this.$utils.boutMethodSummary(this.bout) },
        { term: 'Round', description: this.bout.round ? this.bout.round : 'n/a' },
        { term: 'Time', description: this.bout.time ? this.bout.time : 'n/a' }
        // { term: 'Official Scores', description: this.bout.pretty_official_scores }
      ]
    }
  },
  mounted () {
    console.log('Bout component mounted.')
  }
}
</script>

<style lang="scss" scoped>
</style>
