<template>
  <form-content
    title="Login"
  >
    <login-form />
  </form-content>
</template>

<script>
import FormContent from '@/components/content/form'
import LoginForm from './login-form'

export default {
  components: {
    'form-content': FormContent,
    'login-form': LoginForm
  },
  methods: {
    mounted () {
      console.log('Login page mounted.')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
