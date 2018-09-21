<template>
  <form-content
    title="Register"
  >
    <registration-form />
  </form-content>
</template>

<script>
import FormContent from '@/components/content/form'
import RegistrationForm from './registration-form'

export default {
  components: {
    'form-content': FormContent,
    'registration-form': RegistrationForm
  },
  methods: {
    mounted () {
      console.log('Registration page mounted.')
    }
  }
}
</script>

<style lang="scss" scoped>
//
</style>
