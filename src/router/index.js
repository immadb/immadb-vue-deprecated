import Vue from 'vue'
import Router from 'vue-router'
// import hello from '@/components/Hello.vue'
import home from '@/pages/home.vue'
// // import dashboard from '@/pages/dashboard.vue'
import promotions from '@/pages/promotions/index.vue'
import pastEvents from '@/pages/events/past/index.vue'
import upcomingEvents from '@/pages/events/upcoming/index.vue'
// // import events from '@/pages/events/index.vue'
import eventsShow from '@/pages/events/show.vue'
import boutsShow from '@/pages/bouts/show.vue'
import peopleShow from '@/pages/people/show.vue'
// import news from '@/pages/news/index.vue'
// // import about from '@/pages/about.vue'
// // import help from '@/pages/help.vue'
import login from '@/pages/auth/login.vue'
// // import loginReset from '@/pages/login/reset.vue'
// import profile from '@/pages/user/profile.vue'
// import activity from '@/pages/user/activity.vue'
// import settings from '@/pages/user/settings.vue'
// import register from '@/pages/auth/register.vue'
// // import table from '@/pages/table.vue'
// // import view from '@/pages/view.vue'
// // import _404 from '@/pages/404.vue'
// // import _401 from '@/pages/401.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
    meta: {
      title: 'IMMADb'
    }
  },
  {
    path: '/promotions',
    name: 'promotions',
    component: promotions,
    // beforeEnter: validateUser,
    meta: {
      parent: 'home',
      title: 'Promotions'
    }
  },
  {
    path: '/past-events',
    name: 'past-events',
    component: pastEvents,
    // beforeEnter: validateUser,
    meta: {
      parent: 'home',
      title: 'Past Events'
    }
  },
  {
    path: '/upcoming-events',
    name: 'upcoming-events',
    component: upcomingEvents,
    // beforeEnter: validateUser,
    meta: {
      parent: 'home',
      title: 'Upcoming Events'
    }
  },
  {
    path: '/events/:slug',
    name: 'events.show',
    component: eventsShow,
    // beforeEnter: validateUser,
    meta: {
      parent: 'events',
      title: 'Event :slug'
    }
  },
  {
    path: '/bouts/:slug',
    name: 'bouts.show',
    component: boutsShow,
    // beforeEnter: validateUser,
    meta: {
      parent: 'bouts',
      title: 'Bout :slug'
    }
  },
  {
    path: '/people/:slug',
    name: 'people.show',
    component: peopleShow,
    // beforeEnter: validateUser,
    meta: {
      parent: 'people',
      title: 'Person :slug'
    }
  },
  // {
  //     path: '/news',
  //     name: 'news',
  //     component: news,
  //     // beforeEnter: validateUser,
  //     meta: {
  //         parent: 'home',
  //         title: 'News'
  //     },
  // },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: 'Login'
    }
  }
  // {
  //   path: '/profile',
  //   name: 'profile',
  //   component: profile,
  //   meta: {
  //     title: 'Profile'
  //   }
  // },
  // {
  //   path: '/activity',
  //   name: 'activity',
  //   component: activity,
  //   meta: {
  //     title: 'Activity'
  //   }
  // },
  // {
  //   path: '/settings',
  //   name: 'settings',
  //   component: settings,
  //   meta: {
  //     title: 'Settings'
  //   }
  // },
  // {
  //   path: '/logout',
  //   name: 'logout',
  //   meta: {
  //     title: 'Logout',
  //   // },
  //   // beforeEnter (to, from, next) {
  //   //     store.dispatch('user/logout');
  //   //     next({name: 'home'});
  //   }
  // },
  // {
  //   path: '/register',
  //   name: 'register',
  //   component: register,
  //   meta: {
  //     title: 'Register'
  //   }
  // }
]

const router = new Router({
  routes,
  mode: 'history'
})

export default router
