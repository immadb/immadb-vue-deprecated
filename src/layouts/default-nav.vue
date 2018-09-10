<template>
  <b-navbar toggleable="md" type="light" variantz="info">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <!--
    It seems only the following method of specifying the named route works
    for the navbar brand.  See following link for more information:
    - https://bootstrap-vue.js.org/docs/reference/router-links/
    -->
    <b-navbar-brand :to="{ name: 'home' }">IMMADb</b-navbar-brand>
    <!-- <b-navbar-brand href="{{ route('home') }}">{{ config('app.name', 'IMMADb') }}</b-navbar-brand> -->

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'promotions' }">Promotions</b-nav-item>
        <b-nav-item-dropdown text="Events" right>
          <b-dropdown-item :to="{ name: 'upcoming-events' }">Upcoming</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'past-events' }">Past</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item href="news">News</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!-- Authentication Links -->
        <template v-if="!authenticated">
          <b-nav-item href="/login">Login</b-nav-item>
          <b-nav-item href="/register">Register</b-nav-item>
        </template>

        <!-- @todo Is this really the right way to approach this?  If either are missing, then we assume no user.  We wait for main.js's beforeCreate to kick in, which loads the user. -->
        <template v-else-if="user">
          <!-- <b-nav-item-dropdown text="Contribute" right>
          <b-dropdown-item href="{{ route('people.index') }}">People</b-dropdown-item>
          </b-nav-item-dropdown> -->

          <b-nav-item-dropdown right>
            <template slot="button-content">
              <em>{{ user.handle }}</em>
            </template>
            <b-dropdown-item href="/profile">Profile</b-dropdown-item>
            <b-dropdown-item href="/activity">Activity</b-dropdown-item>
            <b-dropdown-item href="/settings">Settings</b-dropdown-item>
            <b-dropdown-divider />
            <b-dropdown-item :to="{ name: 'logout' }">Logout</b-dropdown-item>
            <!-- <b-dropdown-item href="#" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">Logout</b-dropdown-item>
            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
            {{ csrf_field() }}
            </form> -->
          </b-nav-item-dropdown>
        </template>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  computed: {
    authenticated () {
      return this.$store.getters['user/auth']
    },
    user () {
      return this.$store.getters['user/data']
    }
  },

  mounted () {
    console.log('Default nav mounted.')
  }
}
</script>
