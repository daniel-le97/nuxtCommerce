<script lang="ts" setup>
onMounted(() => {
  getDogs()
})
async function getDogs () {
  try {
     const hi = await dogsService.get()
  } catch (error) {
    // Pop.error(error)
  }
}
</script>

<template>
  <div>
    Component: TheHero
  </div>
</template>

<style scoped></style>
