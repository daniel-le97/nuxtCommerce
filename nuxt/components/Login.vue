<!-- eslint-disable vue/multi-word-component-names, eslint-disable no-console -->
<template>
  <span class="navbar-text">
    <button

      class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0"
      @click="login"
    >
      Login
    </button>
    <button

      class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0 m-2"
      @click="getUser"
    >
      user
    </button>
    <!-- <div v-else>
      <div class="dropdown dropstart my-2 my-lg-0">
        <div
          type="button"
          class="bg-dark border-0 selectable no-select"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <div v-if="account.picture || user.picture">
            <img :src="account.picture || user.picture" alt="account photo" height="40" class="rounded">
          </div>
        </div>
        <div class="dropdown-menu dropdown-menu-lg-left p-0" aria-labelledby="authDropdown">
          <div class="list-group">
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item dropdown-item list-group-item-action">
                Manage Account
              </div>
            </router-link>
            <div class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="logout">
              <i class="mdi mdi-logout" />
              logout
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </span>
</template>

<script>
// import { computed } from 'vue'
import { AppState } from '../AppState'
import { Account } from '../models/Account'
// import { authService } from '../service/AuthService'
// import { AuthService } from '../services/AuthService'
export default {
  setup () {
    return {
      user: computed(() => AppState.user),
      account: computed<Account>(() => AppState.account),
      async login () {
        const route = useRoute()
        const { getProviderAuthenticationUrl, authenticateProvider } = useStrapiAuth()
        window.location = getProviderAuthenticationUrl('auth0')
        // const { authenticateProvider } = useStrapiAuth()
        const hi = await authenticateProvider('auth0', route.query.access_token)
        logger.log(hi.user.value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
