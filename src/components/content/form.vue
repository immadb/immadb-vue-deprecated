<template>
  <b-card
    no-body
    border-variant="light"
  >
    <b-card-header
      header-bg-variant="white"
    >
      <b-container>
        <b-row>
          <b-col class="p-0">
            <h2 class="mb-0">
              {{ title }}
            </h2>
          </b-col>
        </b-row>
      </b-container>
    </b-card-header>
    <b-card-body>
      <b-container>
        <b-row align-h="center">
          <b-col cols="6" class="p-0">
            <slot />
          </b-col>
        </b-row>
      </b-container>
    </b-card-body>
  </b-card>
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
