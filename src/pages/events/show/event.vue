<template>
  <basic-card>
    <template slot="header">
      <div class="media">
        <!-- <b-img rounded :src="personImageUrl" class="mr-3" :alt="event.title" height="300" width="300" /> -->
        <b-img rounded blank blank-color="lightgray" class="mr-3" :alt="event.title" height="300" width="300" />
        <div class="media-body">
          <description-list :items="eventDetails" />
        </div>
      </div>
    </template>

    <basic-tabs>
      <b-tab title="Bouts" class="table-tab">
        <!-- add some bottom margin to help spoilers checkbox look a little better placed -->
        <!-- @todo Consider a better way to solve this so there's no so much whitespace. -->
        <b-row v-if="event.status === 'finished'" class="mb-3">
          <b-col class="text-right">
            <b-form-checkbox
              id="spoilersCheckbox"
              v-model="spoilers"
              :value="true"
              :unchecked-value="false">
              spoilers
            </b-form-checkbox>
          </b-col>
        </b-row>

        <bout-table
          :bouts="event.bouts"
          :spoilers="spoilers"
        />

      </b-tab>
      <b-tab title="Media">
        Media
      </b-tab>
      <b-tab title="Notes">
        <basic-notes :notes="event.notes" />
      </b-tab>
    </basic-tabs>
  </basic-card>
</template>

<script>
import BasicCard from '@/components/general/basic-card'
import BasicNotes from '@/components/general/basic-notes'
import BasicTabs from '@/components/general/basic-tabs'
import BoutTable from './bout-table'
import DescriptionList from '@/components/general/description-list'

export default {
  components: {
    'basic-card': BasicCard,
    'basic-notes': BasicNotes,
    'basic-tabs': BasicTabs,
    'bout-table': BoutTable,
    'description-list': DescriptionList
  },
  props: {
    'event': {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      spoilers: false
    }
  },
  computed: {
    eventDetails () {
      return [
        // { term: 'Date/Time', description: this.event.full_date_full_time },
        { term: 'Status', description: this.$utils.eventStatus(this.event) },
        { term: 'Venue', description: this.event.venue },
        // { term: 'Location', description: this.event.location },
        { term: 'Bouts', description: this.event.bouts_count }
      ]
    },
    finished () {
      return this.event.status === 'finished'
    }
  // reverseBouts() {
  //     if (!this.event.bouts) {
  //         return
  //     }
  //
  //     return this.event.bouts.slice().reverse().filter(function (bout) {
  //         return bout.status != 'canceled'
  //     })
  // },
  },
  mounted () {
    console.log('Show event component mounted.')
  }
}
</script>
