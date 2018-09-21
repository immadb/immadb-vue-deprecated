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
    async register ({commit, dispatch}, {credentials, route}) {
      console.log(credentials)
      const {data} = await axios.post('registrations', credentials, {custom: true})
      console.log(data)
      // commit('authSet', {data})
      // await dispatch('data')
      // router.push(route)
    },

    async login ({commit, dispatch}, {credentials, route}) {
      const {data} = await axios.post('login', credentials, {custom: true})
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
        // router.push({name: 'login', params: {route: {path: window.location.pathname}}})
      }
    },

    async data ({commit, state, getters}) {
      if (state.auth) {
        try {
          const {data} = await axios.get('account')
          commit('data', data)
        } catch (err) {
          console.log(err)
          commit('authDelete')
          // router.push({name: 'login', params: {route: {path: window.location.pathname}}})
        }
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

    // async register ({commit, dispatch}, {credentials, route}) {
    //   const {data} = await axios.post('register', credentials, {custom: true})
    //   commit('authSet', {data})
    //   await dispatch('data')
    //   router.push(route)
    // }
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
