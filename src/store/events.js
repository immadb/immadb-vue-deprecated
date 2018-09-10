import axios from '@/modules/axios'

export default {
  namespaced: true,

  state: {
    data: null
  },

  mutations: {
    data (state, {data}) {
      state.data = data
    }
  },

  actions: {
    async past ({commit, dispatch, state, getters}, params) {
      params = Object.assign({}, params)
      const res = await axios.get('past-events', { params })
      commit('data', res)
      return getters.data
    },
    async upcoming ({commit, dispatch, state, getters}, params) {
      params = Object.assign({}, params)
      const res = await axios.get('upcoming-events', { params })
      commit('data', res)
      return getters.data
    }
  },

  getters: {
    data (state) {
      return state.data
    }
  }
}
