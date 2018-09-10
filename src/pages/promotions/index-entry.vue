<template>
  <b-media no-body tag="li">
    <b-media-aside>
      <b-img rounded thumbnail :src="promotionImageUrl" class="mr-3" :alt="promotion.name" />
      <!-- <b-img rounded thumbnail blank class="mr-3" :alt="promotion.name" height="75" width="75" /> -->
    </b-media-aside>
    <b-media-body>
      <div class="clearfix">
        <b-container>
          <b-row>
            <b-col>
              <h5 class="mt-0 mb-1 text-left">
                <b-link :href="'promotions/' + promotion.slug">{{ promotion.name }}</b-link>
                <!-- <router-link :to="this.$utils.eventRoute(event)">
                  {{ event.title }}
                  <small class="text-muted">{{ event.subtitle }}</small>
                </router-link> -->
              </h5>
            </b-col>
            <b-col>
              <h6 class="mt-0 mb-1">
                <address class="text-right">
                  {{ promotion.location }}
                </address>
              </h6>
            </b-col>
            <b-col>
              <h6 class="mt-0 mb-1 text-center">
                social links go here
              </h6>
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
    'promotion': {
      required: true,
      type: Object
    }
  },
  computed: {
    promotionImageUrl: function () {
      // return '#'
      return this.$utils.promotionTwitterProfileThumbUrl(this.promotion)
    }
  },
  methods: {
    mounted () {
      console.log('Promotion entry component mounted.')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
