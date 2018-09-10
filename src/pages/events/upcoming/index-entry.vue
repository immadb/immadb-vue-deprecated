<template>
  <b-media no-body tag="li">
    <b-media-aside>
      <b-img rounded thumbnail :src="promotionImageUrl" class="mr-3" :alt="event.promotion.name" />
      <!-- <b-img rounded thumbnail blank class="mr-3" :alt="event.promotion.name" height="75" width="75" /> -->
    </b-media-aside>
    <b-media-body>
      <div class="clearfix">
        <b-container>
          <b-row>
            <b-col>
              <h5 class="mt-0 mb-1 text-left">
                <router-link :to="this.$utils.eventRoute(event)">
                  {{ event.title }}
                  <small class="text-muted">{{ event.subtitle }}</small>
                </router-link>
              </h5>
              <h6 class="mt-0 mb-1 text-left">
                  Bouts: {{ event.bouts_count }}
              </h6>
              <h6 v-if="event.main_event" class="mt-0 mb-1">
                  <router-link :to="{ name: 'bouts.show', params: { slug: event.main_event.slug }}" v-text="$utils.boutTitle(event.main_event)" />
              </h6>
            </b-col>
            <b-col>
              <h6 class="mt-0 mb-1 text-right">
                {{ event.full_date_full_time }}
              </h6>
              <address class="text-right">
                {{ event.venue }}<br />
                {{ event.location }}
              </address>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </b-media-body>
  </b-media>
</template>

<script>
export default {
  props: {
    'event': {
      required: true,
      type: Object
    }
  },
  computed: {
    promotionImageUrl: function () {
      return this.$utils.promotionTwitterProfileThumbUrl(this.event.promotion)
    }
  },
  methods: {
    mounted () {
      console.log('Event-entry component mounted.')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
