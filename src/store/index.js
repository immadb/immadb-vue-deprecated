import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import bout from './bout'
import event from './event'
import events from './events'
import person from './person'
import promotions from './promotions'
import user from './user'

const store = new Vuex.Store({
  strict: true,
  modules: {
    bout,
    event,
    events,
    person,
    promotions,
    user
  }
})

export default store
