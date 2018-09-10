<template>
  <b-navbar toggleable="md" type="light" variant="light">
    <b-navbar-toggle target="footer_nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="/">IMMADb</b-navbar-brand>

    <b-collapse is-nav id="footer_nav_collapse">
      <b-navbar-nav>
        <b-nav-item href="promotions">Contact Us</b-nav-item>
        <b-nav-item href="promotions">Privacy Policy</b-nav-item>
        <b-nav-item href="promotions">Terms of Use</b-nav-item>
        <b-nav-item href="promotions">Advertising</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-text>
          &copy; 2018 IMMADb
        </b-nav-text>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
  export default {
    mounted () {
      console.log('Default footer component mounted.')
    }
  }
</script>
