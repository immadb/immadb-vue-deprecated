import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import bout from './bout'
import event from './event'
import events from './events'
import promotions from './promotions'

const store = new Vuex.Store({
  strict: true,
  modules: {
    bout,
    event,
    events,
    promotions
  }
})

export default store
