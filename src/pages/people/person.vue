<template>
  <basic-card>
    <template slot="header">
      <b-media no-body>
        <b-media-aside vertical-align="top">
          <b-img rounded :src="personImageUrl" class="mr-3" :alt="person.complete_name" height="300" width="300" />
          <!-- <b-img rounded blank blank-color="lightgray" class="mr-3" :alt="person.complete_name" height="300" width="300" /> -->
        </b-media-aside>
        <b-media-body>
          <description-list :items="detailItems" />
        </b-media-body>
      </b-media>
    </template>

    <basic-tabs>
      <b-tab title="Bouts" class="table-tab">
        <b-row>
          <b-col class="text-right">
            <b-form-checkbox
              id="spoilersCheckbox"
              class="spoilers-checkbox"
              v-model="showResults"
              :value="true"
              :unchecked-value="false"
            >
              spoilers
            </b-form-checkbox>
          </b-col>
        </b-row>
        <b-table
          :striped="true"
          :hover="true"
          :fields="boutTableFields"
          :items="person.bouts"
          :show-empty="true"
        >
          <template slot="results" slot-scope="data">
            <div v-if="showResults">
              <b-badge :variant="$utils.boutResultVariant(data.item, person)">{{ $utils.boutFighterResult(data.item, person) }}</b-badge>
              <p class="m-0">
                {{ $utils.boutMethodSummary(data.item) }}
              </p>
              <p class="m-0">
                {{ $utils.boutTimeSummary(data.item) }}
              </p>
            </div>
          </template>

          <template slot="opponent" slot-scope="data">
            <b-img-lazy center rounded thumbnail :src="opponentImageUrl(data.item)" :alt="opponentName(data.item)" height="75" width="75" />
            <!-- <b-img center rounded thumbnail blank :alt="opponentName(data.item)" height="75" width="75" /> -->
            <p class="text-center">
              <router-link :to="opponentLink(data.item)">
                {{ opponentName(data.item) }}
              </router-link>
            </p>
          </template>

          <template slot="event" slot-scope="data">
            <p class="m-0">
              <router-link :to="$utils.eventRoute(data.item.event)">
                {{ $utils.eventFullTitle(data.item.event) }}
              </router-link>
            </p>
            <p class="m-0">{{ data.item.event.date }} | {{ data.item.event.location }}</p>
          </template>

          <template slot="bout" slot-scope="data">
            <router-link :to="$utils.boutRoute(data.item)">
              {{ $utils.boutWeight(data.item) }} | {{ $utils.boutBilling(data.item) }}
            </router-link>
          </template>
        </b-table>

        <!-- @forelse ($fighter->bouts->sortByDesc('event.date_time_utc') as $bout)
        @include('fighters.partial.bout', $bout, [
        'bout' => $bout,
        'event' => $bout->event,
        'fighter' => $fighter,
        'opponent' => $bout->opponent($fighter),
        ])
        @endforelse -->
      </b-tab>
      <b-tab title="Media">
        Media
      </b-tab>
      <b-tab title="Discussions" class="table-tab">
        <!-- <discussions :discussions="fighter.discussions" /> -->
      </b-tab>
    </basic-tabs>
  </basic-card>
</template>

<script>
import BasicCard from '@/components/general/basic-card'
import BasicTabs from '@/components/general/basic-tabs'
import DescriptionList from '@/components/general/description-list'
// import discussions from '@/components/general/discussion-index'

export default {
  components: {
    'basic-card': BasicCard,
    'basic-tabs': BasicTabs,
    'description-list': DescriptionList
    // 'discussions': discussions,
  },
  props: {
    'person': {
      required: true,
      type: Object
    },
    spoilers: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      showResults: this.spoilers
    }
  },
  computed: {
    personImageUrl () {
      return this.$utils.personTwitterProfileLargeUrl(this.person)
    },
    detailItems () {
      return [
        { term: 'First Name', description: this.person.first_name },
        { term: 'Last Name', description: this.person.last_name },
        { term: 'Nickname', description: this.person.nickname },
        { term: 'Height', description: this.person.height },
        { term: 'Reach', description: this.person.reach },
        { term: 'Leg Reach', description: this.person.leg_reach },
        { term: 'Born', description: this.person.born }
        // @foreach ($person->person->links as $key => $value)
        //   @if ($value)
        //     <dt class="col-sm-3">{{ $person->person->present()->linkType($key) }}</dt>
        //     <dd class="col-sm-9">{!! $person->person->present()->socialLink($key, $value) !!}</dd>
        //   @endif
        // @endforeach
      ]
    },
    boutTableFields () {
      return [
        { key: 'results', class: 'align-middle text-center', thStyle: 'width: 16.66%' },
        { key: 'opponent', class: 'align-middle text-center' },
        { key: 'event', class: 'align-middle' },
        { key: 'bout', class: 'align-middle text-center' }
      ]
    }
  },
  methods: {
    opponent (bout) {
      if (bout.red_fighter && (bout.red_fighter.id === this.person.id)) {
        return bout.blue_fighter
      }

      if (bout.blue_fighter && (bout.blue_fighter.id === this.person.id)) {
        return bout.red_fighter
      }

      return null
    },
    opponentImageUrl (bout) {
      let o = this.opponent(bout)

      return this.$utils.personTwitterProfileLargeUrl(o)
    },
    opponentLink (bout) {
      let o = this.opponent(bout)

      return this.$utils.personRoute(o)
    },
    opponentName (bout) {
      let o = this.opponent(bout)

      return o ? o.full_name : 'n/a'
    }
  },
  mounted () {
    console.log('Person component mounted.')
  }
}
</script>

<style lang="scss" scoped>
.spoilers-checkbox {
  margin-bottom: .625rem;
}
.table-tab {
  padding-top: .625rem;
}
</style>
