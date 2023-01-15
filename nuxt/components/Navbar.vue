<template>
  <nav class="bg-gray-900">
    <div class="px-3 py-2 flex items-center justify-between">
      <router-link :to="{ name: 'Home' }" class="flex items-center">
        <img alt="logo" src="../assets/img/cw-logo.png" height="45" class="mr-3">
      </router-link>
      <button
        class="text-white focus:outline-none"
        type="button"
        aria-label="Toggle navigation"
        @click="toggleNavbar"
      >
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 5H20M4 12H20M4 19H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
    <transition name="navbar">
      <div v-if="showNavbar" class="bg-gray-900 p-3">
        <ul class="flex">
          <li class="mr-3">
            <router-link :to="{ name: 'About' }" class="text-green-300 hover:text-white">
              About
            </router-link>
          </li>
          <li>
            <button class="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
              Create group
            </button>
          </li>
        </ul>
        <button class="mt-3 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600" @click="changeUrl">
          button
        </button>
        <LoginBox />
      </div>
    </transition>
  </nav>
</template>
<script>
import { useRoute } from 'vue-router'

export default {
  setup () {
    const route = useRoute()
    const showNavbar = ref(false)
    const toggleNavbar = () => { showNavbar.value = !showNavbar.value }
    return {
      changeUrl () {
        route.name = 'Group'
      },
      toggleNavbar,
      showNavbar
    }
  }
}
</script>
<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}

</style>
