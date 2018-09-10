<template>
  <dl class="row">
    <template v-for="item in items">
      <dt class="col-sm-3">{{ item.term }}</dt>
      <dd class="col-sm-9">
        <template v-if="item.url">
          <a :href="item.url">
            {{ item.description }}
          </a>
        </template>
        <template v-else-if="item.route">
          <router-link :to="item.route">
            {{ item.description }}
          </router-link>
        </template>
        <template v-else>
          {{ item.description }}
        </template>
      </dd>

      <!-- implement with nesting at some point, if needed -->
      <!-- <dt class="col-sm-3">Nesting</dt>
      <dd class="col-sm-9">
        <dl class="row">
          <dt class="col-sm-4">Nested definition list</dt>
          <dd class="col-sm-8">Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc.</dd>
        </dl>
      </dd> -->
    </template>
  </dl>
</template>

<script>
export default {
  props: {
    'items': {
      type: Array,
      required: true
    }
  }
}
</script>
