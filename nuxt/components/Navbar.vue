<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="fixed w-full z-10 top-0 bg-white shadow-md p-5   transition-all" :class="{'bg-white shadow-md': isVisible, '    bg-custom text-white transition-all ': !isVisible}">
    <div class="container mx-auto flex flex-wrap items-center justify-between">
      <div class="w-1/3">
        <router-link to="/" class="text-lg font-medium  no-underline">
          Your Brand
        </router-link>
      </div>
      <div class="w-1/3 hidden md:block">
        <div class="text-center">
          <router-link to="/" class="text-base  no-underline hover:text-gray-800">
            Home
          </router-link>

          <router-link to="/cart" class="ml-4 text-base no-underline hover:text-gray-800">
            Cart
          </router-link>
          <router-link to="/checkout" class="ml-4 text-base no-underline hover:text-gray-800">
           Checkout
          </router-link>

        </div>
      </div>
      <div class="w-1/3">
        <div class="flex justify-end">
          <button class=" text-xl leading-none p-2 rounded-full hover:bg-gray-100 hover:text-gray-600">
            <Login />
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
// import Login from './Login.vue'

export default {
  data () {
    return {
      isVisible: true
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      if (window.scrollY > 50) {
        this.isVisible = false
      } else {
        this.isVisible = true
      }
    }
  }
}
</script>
<style lang="scss">

.bg-custom{
  background-color:rgba(0, 0, 0, 0.584);
  backdrop-filter: blur(4px);

}

</style>
