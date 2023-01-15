<template>
  <div class="p-3 mt-10 flex z-10">
    <div class="w-2/4 relative ">
      <img src="https://images.unsplash.com/photo-1591035897819-f4bdf739f446?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" class="h-full object-cover">
    </div>
    <div class=" w-2/4 px-5 flex flex-col  bg-white py-5">
      <div class="flex justify-start">
        <img src="https://cdn-icons-png.flaticon.com/512/7199/7199551.png" alt="goodVibes Image" width="90" class="">
      </div>
      <h3 class=" leading-relaxed">
        Welcome to Sunny Vibes, where we specialize in crafting the most fashion-forward and expertly made women's hats. From the luxurious feel of Ecuadorian Panama hats to the airy linen sun hats, we've got you covered for all your summer needs.
        <br>
        Our collection also features an array of stylish headbands in a variety of colors to complement any outfit. As the seasons change, so do our offerings. Our autumn/winter collection is filled with sustainable and on-trend options such as wool-felt and fur-felt fedoras, trilbies, and cloches, as well as must-have bucket hats and waterproof headwear. Whether you're dressing up for a special occasion like a race day or Royal Ascot, or simply looking for a unique headpiece for your wedding, Sunny Vibes has something for everyone. Experience the best in millinery and elevate your style with us.
      </h3>
      <div class="flex justify-end">
        <img src="https://cdn-icons-png.flaticon.com/512/4207/4207745.png" alt="goodVibes Image" width="90">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.text-box{
  transform: translateX(530px) !important;
}

.absolute{
  top: 40px;
  left: 400px;
width: 500px;
//when screen is 768px OR LESS
@media only screen and (max-width: 768px){

}
}
</style>
