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
    async get ({commit, getters}, params) {
      params = Object.assign({}, params)
      const res = await axios.get(`/people/${params.slug}`, {})
      commit('data', res)
      return getters.data
    // },
    // async clear ({commit}) {
    //   commit('data', null)
    }
  },

  getters: {
    data (state) {
      return state.data
    }
  }
}
