<template>
  <b-card no-body>
    <b-card-header>
      <div class="media">
        <b-img rounded blank blank-color="lightgray" class="mr-3" :alt="event.title" height="300" width="300" />
        <div class="media-body">
          <description-list :items="eventDetails" />
        </div>
      </div>
    </b-card-header>
    <b-card-body class="pb-0">
      <b-row v-if="event.status === 'finished'">
        <b-col class="text-right">
          <b-form-checkbox id="spoilersCheckbox"
            v-model="spoilers"
            :value="true"
            :unchecked-value="false">
            spoilers
          </b-form-checkbox>
        </b-col>
      </b-row>

      <!-- @todo Need to handle this with CSS instead. -->
      <hr v-if="finished" />

      <event-bout
        v-for="bout in event.bouts"
        :key="bout.id"
        :bout="bout"
        :spoilers="spoilers"
      />
    </b-card-body>
  </b-card>
</template>

<script>
import eventBout from './event-bout'
import descriptionList from '@/components/general/description-list'

export default {
  components: {
    'event-bout': eventBout,
    'description-list': descriptionList
  },
  props: {
    'event': {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      spoilers: false,
      eventDetails: [
        // { term: 'Date/Time', description: this.event.full_date_full_time },
        { term: 'Status', description: this.$utils.eventStatus(this.event) },
        { term: 'Venue', description: this.event.venue },
        // { term: 'Location', description: this.event.location },
        { term: 'Bouts', description: this.event.bouts_count }
      ]
    }
  },
  computed: {
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
    console.log('Event component mounted.')
  }
}
</script>
