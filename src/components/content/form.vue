<template>
  <b-container>
    <b-row>
      <b-col md="6" offset-md="3">
        <b-card no-body>
          <b-card-header>
            <h2 class="mb-0">
              {{ title }}
            </h2>
          </b-card-header>
          <b-card-body>
            <slot></slot>
          </b-card-body>
          <b-card-footer>
            <!-- @todo What do we do with this...? -->
          </b-card-footer>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: {
    'title': {
      type: String,
      required: true
    }
  }
}
</script>
