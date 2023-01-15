<template>
  <div>
    <slot v-if="loaded" @load="loaded = true" @error="loaded = false" >

    </slot>
 
    <Loader v-if="!loaded" />
  </div>
</template>

<script>


export default {
  components: {
    Loader
  },

  data() {
    return {
      loaded: false
    }
  }
}
</script>
