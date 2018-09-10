import axios from '@/modules/axios'
import router from '@/router'

const user = {
  namespaced: true,

  state: {
    data: null,
    auth: JSON.parse(localStorage.getItem('auth'))
  },

  mutations: {
    data (state, {data}) {
      state.data = data
    },

    authSet (state, {data}) {
      state.auth = data
      localStorage.setItem('auth', JSON.stringify(data))
    },

    authDelete (state) {
      state.auth = null
      state.data = null
      localStorage.removeItem('auth')
    }
  },

  actions: {
    async login ({commit, dispatch}, {form, route}) {
      const {data} = await axios.post('login', form, {custom: true})
      commit('authSet', {data})
      await dispatch('data')
      router.push(route)
    },

    async logout ({commit}, {post} = {}) {
      try {
        if (post) {
          await axios.post('logout')
        }
      } catch (err) {
        // ...
      } finally {
        commit('authDelete')
        router.push({name: 'login', params: {route: {path: window.location.pathname}}})
      }
    },

    async data ({commit, state, getters}) {
      if (state.auth) {
        const {data} = await axios.get('account')
        commit('data', data)
        return getters.data
      }
    }

    // async update (context, params) {
    //   try {
    //     const res = await req.put(`/users/${params.id}`, params, { baseURL: '' })
    //     // const res = await req.put(`${config.apiURL}client/users/${params.id}`, params, { baseURL: '' })
    //     context.commit('setData', res.data)
    //   } catch (err) {
    //     console.log(err)
    //   }
    // },
    //
    // async register (context, params) {
    //   const res = await req.post('/register', params)
    //
    //   // context.commit('authSet', res.data)
    //
    //   // await context.dispatch('get')
    // },
  },

  getters: {
    auth (state) {
      return state.auth
    },
    data (state) {
      return state.data
    }
  }
}

export default user
