// eslint-disable-next-line vue/multi-word-component-names
<template>
  <span class="navbar-text">
    <button
      v-if="!user.isAuthenticated"
      class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0"
      @click="login"
    >
      Login
    </button>
    <div v-else>
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
    </div>
  </span>
</template>

<script>
import { AuthService } from '../service/AuthService'

export default {
  setup () {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login () {
        await AuthService.loginWithPopup()
      },
      logout () {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
