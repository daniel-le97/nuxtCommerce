<template>

<nuxt-link :to="`/product/bracelet`">

  <div class="relative shadow-xl product-card rounded-lg">
    <img class=" object-cover  rounded-lg" src="https://images.unsplash.com/photo-1632670549453-7a3dfac254a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="image">

    <div class="absolute top-0 left-0 w-full h-full  opacity-0 transition-opacity duration-300">
        <div class="p-4 text-white text-center">
            <h4 class="text-lg font-medium">{{product.name}}</h4>
            <p class="text-gray-600"> {{ product.price }}  </p>
        </div>
    </div>
</div>

</nuxt-link>

</template>


<script>
export default {
  props:{
    product:{type:Object,required:true}
  },
  setup(props){
    return {}
  }
}
</script>


<style lang="scss" scoped>

.product-card img{

  height: 300px;
}
.product-card:hover .absolute {

    opacity: 0.8;
}
.product-card .absolute {
    transition: all 0.3s ease-out;

    opacity: 0;
}
.product-card:hover .absolute {
  transition: all 0.3s ease-out;
border-radius: 8px;
 background-color: rgba(0, 0, 0, 0.623);
 backdrop-filter: blur(4px);
    opacity: 1;
}

</style>
