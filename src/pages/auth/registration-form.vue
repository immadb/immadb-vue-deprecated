<template>
  <b-form @submit.prevent="register" @keydown="clearErrors">
    <b-form-group id="registerNameGroup"
      label="Name:"
      label-for="name"
    >
      <b-form-input id="name"
        name="name"
        type="text"
        v-model="form.name"
        :state="getState('name')"
        placeholder="Enter name"
        required autofocus
      />

      <!-- <div class="form-group row">
          <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>

          <div class="col-md-6">
              <input id="name" type="text" class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}" name="name" value="{{ old('name') }}" required autofocus>

              @if ($errors->has('name'))
                  <span class="invalid-feedback">
                      <strong>{{ $errors->first('name') }}</strong>
                  </span>
              @endif
          </div>
      </div> -->


      <!-- <b-form-feedback id="input-feedback"> -->
      <!-- This will only be shown if the preceeding input has an invalid state -->
      <!-- {{ form.errors.first('email') }}
      </b-form-feedback> -->
    </b-form-group>

    <b-form-group id="registerEmailGroup"
      label="Email address:"
      label-for="email"
    >
      <b-form-input id="email"
        name="email"
        type="email"
        v-model="form.email"
        :state="getState('email')"
        placeholder="Enter email"
        required
      />

      <!-- <b-form-feedback id="input-feedback"> -->
      <!-- This will only be shown if the preceeding input has an invalid state -->
      <!-- {{ form.errors.first('email') }}
      </b-form-feedback> -->
    </b-form-group>

    <b-form-group id="registerHandleGroup"
      label="Handle:"
      label-for="handle"
    >
      <b-form-input id="handle"
        name="handle"
        type="text"
        v-model="form.handle"
        :state="getState('handle')"
        placeholder="Enter handle"
        required
      />

      <!-- <b-form-feedback id="input-feedback"> -->
      <!-- This will only be shown if the preceeding input has an invalid state -->
      <!-- {{ form.errors.first('email') }}
      </b-form-feedback> -->
    </b-form-group>

    <b-form-group id="registerPasswordGroup"
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

    <b-form-group id="registerPasswordConfirmationGroup"
      label="Confirm Password:"
      label-for="password_confirmation"
    >
      <b-form-input id="password_confirmation"
        name="password_confirmation"
        type="password"
        v-model="form.password_confirmation"
        :state="getState('password_confirmation')"
        placeholder="Confirm password"
        required
      />

      <!-- <b-form-feedback id="input-feedback"> -->
      <!-- This will only be shown if the preceeding input has an invalid state -->
      <!-- {{ form.errors.first('password') }}
      </b-form-feedback> -->

      <!-- <div class="form-group row">
          <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Confirm Password</label>

          <div class="col-md-6">
              <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>
          </div>
      </div> -->
    </b-form-group>

    <b-button type="submit" variant="primary">Register</b-button>

<!--

    <form method="POST" action="{{ route('register') }}">
        @csrf

        <div class="form-group row">
            <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

            <div class="col-md-6">
                <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required>

                @if ($errors->has('password'))
                    <span class="invalid-feedback">
                        <strong>{{ $errors->first('password') }}</strong>
                    </span>
                @endif
            </div>
        </div>

        <div class="form-group row">
            <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Confirm Password</label>

            <div class="col-md-6">
                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>
            </div>
        </div>

    </form> -->

  </b-form>
</template>

<script>
// import {mapKeys, get} from 'lodash'
import Form from '@/helpers/form.js'

const form = new Form({
  name: '',
  email: '',
  handle: '',
  password: '',
  password_confirmation: ''
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

    async register () {
      try {
        // this.reset()
        this.processing = true
        // this.loading = true
        await this.$store.dispatch('user/register', { credentials: this.form.getData(), route: {...this.route} })
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
