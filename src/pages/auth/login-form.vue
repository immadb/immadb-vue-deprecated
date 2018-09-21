<template>
  <b-form @submit.prevent="login" @keydown="clearErrors">
    <b-form-group id="loginEmailGroup"
      label="Email address:"
      label-for="email"
    >
      <b-form-input id="email"
        name="email"
        type="email"
        v-model="form.email"
        :state="getState('email')"
        placeholder="Enter email"
        required autofocus
      />

      <!-- <b-form-feedback id="input-feedback"> -->
      <!-- This will only be shown if the preceeding input has an invalid state -->
      <!-- {{ form.errors.first('email') }}
      </b-form-feedback> -->
    </b-form-group>

    <b-form-group id="loginPasswordGroup"
      label="Password:"
      label-for="password"
    >
      <b-form-input id="password"
        name="password"
        type="password"
        v-model="form.password"
        :state="getState('password')"
        placeholder="Enter password"
        required
      />

      <!-- <b-form-feedback id="input-feedback"> -->
      <!-- This will only be shown if the preceeding input has an invalid state -->
      <!-- {{ form.errors.first('password') }}
      </b-form-feedback> -->
    </b-form-group>

    <b-button type="submit" variant="primary">Login</b-button>
    <button type="button" class="btn btn-link">Forgot your password?</button>
  </b-form>
</template>

<script>
// import {mapKeys, get} from 'lodash'
import Form from '@/helpers/form.js'

const form = new Form({
  email: '',
  password: ''
})

export default {
  props: {
    route: {
      type: Object,
      required: false,
      default: () => ({name: 'home'})
    }
  },

  data () {
    return {
      success: false,
      form: form,
      processing: false
    }
  },

  methods: {
    getState (field) {
      return this.form.errors.has(field) ? false : null
    },

    clearErrors () {
      this.form.errors.clear()
    },

  // onSubmit(evt) {
  //     console.log(this.form)
  //
  //     this.form
  //         .post('/login')
  //         .then( (response) => {
  //             this.handleSuccess(response)
  //         }, (error) => {
  //             this.handleError(error)
  //         })
  //
  //     // this.success = res.data.message
  //     this.clearErrors()
  // },

    async login () {
      try {
        // this.reset()
        this.processing = true
        // this.loading = true
        await this.$store.dispatch('user/login', {credentials: this.form.getData(), route: {...this.route}})
      } catch (err) {
        console.log(err.response.data)
        this.form.errors.attach(err.response.data)
        // this.error = get(err, "response.data", {})
      } finally {
        this.processing = false
        // this.loading = false
      }
    }

  // async onSubmit() {
  //     if (this.processing) {
  //         return
  //     }
  //
  //     this.processing = true
  //     this.clearErrors()
  //
  //     try {
  //         await this.$store.dispatch('user/login', this.form)
  //         // this.$store.dispatch('alert/show', {
  //         // message: 'Logged in...!'
  //         // })
  //
  //         /**
  //          * @todo Look to have the login success handle getting the user.
  //          */
  //         // await this.$store.dispatch('user/get').then(() => {
  //             this.form.reset()
  //             this.$router.push({ name:'home' })
  //             // this.$router.push({ name:'dashboard' })
  //         // })
  //     } catch(e) {
  //         console.log(e.response.data)
  //         if (e.response.data['error']) {
  //             this.$store.dispatch('alert/show', {
  //                 type: 'danger',
  //                 // title: 'Error',
  //                 message: e.response.data['error'],
  //             })
  //         } else {
  //             this.errors.attach(e.response.data)
  //         }
  //     } finally {
  //         this.processing = false
  //     }
  // },

  // handleSuccess(response) {
  //     console.log('success!')
  //     console.log(response)
  //     // this.$emit('succeeded', response)
  //     window.location.replace('/events')
  // },

  // handleError(error) {
  //     console.log('error!')
  //     console.log(error)
  //     // this.$emit('failed', error)
  // },
  }
}
</script>
