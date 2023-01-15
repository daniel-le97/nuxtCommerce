<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="fixed w-full z-10 top-0 bg-white shadow-md p-2   transition-all" :class="{'bg-white shadow-md': isVisible, '    bg-custom text-white transition-all ': !isVisible}">
    <div class="container mx-auto flex flex-wrap items-center justify-between">
      <div class="w-1/3">
        <router-link to="/" class="text-lg font-medium  no-underline" active-class="active-link">
         <img src="../assets/Logo.png" alt="" width="80"  class="shadow-xl rounded-xl">
        </router-link>
      </div>
      <div class="w-1/3 hidden md:block">
        <div class="text-center">


          <router-link to="/cart" class="ml-4 text-base no-underline hover:text-gray-800" active-class="active-link">
            Cart
          </router-link>
          <router-link to="/checkout" class="ml-4 text-base no-underline hover:text-gray-800 " active-class="active-link">
           Checkout
          </router-link>
          <router-link to="/about" class="ml-4 text-base no-underline hover:text-gray-800" active-class="active-link">
         About Us
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
.active-link{
border-bottom: 3px solid #2bd882;

}

</style>
