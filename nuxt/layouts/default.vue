<template>
  <div>
    <Navbar />
    <Nuxt />
    <Footer />
  </div>
</template>


<script>
import { Footer, Navbar } from "~~/.nuxt/components.js";


export default {
  components: {
    Navbar,
    Footer,
    Navbar,
    Footer
}
}
</script>