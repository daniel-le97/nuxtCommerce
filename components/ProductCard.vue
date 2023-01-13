<template>
<div class="relative  shadow-xl product-card">
    <img class="w-full h-48 object-cover " src="https://images.unsplash.com/photo-1632670549453-7a3dfac254a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="image">
    <div class="p-4">
        <h4 class="text-lg font-medium">Card Title</h4>
        <p class="text-gray-600">Card body text goes here</p>
    </div>
</div>
</template>


<script>
export default {
  setup(){
    return {}
  }
}
</script>


<style lang="scss" scoped>
.product-card {
  transition: all 0.2s ease-in-out;
}

.product-card:hover {
  transform: scale(1.05);
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
}
.product-card:not(:hover) {
  filter: brightness(80%);
}

</style>