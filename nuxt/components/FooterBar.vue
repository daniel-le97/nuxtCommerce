<template>
  <footer class="mt-10  ">
    <div class="flex justify-between p-5 bg-slate-900 text-white">
      <div class="footer-section">
        <nuxt-link to="/about">About Us</nuxt-link>
      </div>
      <div class="footer-section">
        <nuxt-link to="/faq">FAQ</nuxt-link>
      </div>
      <div class="footer-section">
        <nuxt-link to="/contact">Contact Us</nuxt-link>
        <div class="mt-4 flex">

          <img src="https://avatars.githubusercontent.com/u/107594367?s=400&u=279c4a706755639789d6b825966e54161df0c7aa&v=4" alt="" width="60" class="rounded-full shadow-md">

          <div class="ml-5 flex gap-5 items-center">
            <div class="">
              <img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" alt="" width="30" height="30">
            </div>
            <div class="">
              <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fsocial-media-and-logos-11%2F32%2FLogo_Github-512.png&f=1&nofb=1&ipt=6cc9a130a9bb53997e07157eac5064ae54cdf9af88484f7a3e634e9bf6cf5f54&ipo=images" alt="" width="30" height="30">
            </div>

          </div>

        </div>

      </div>
    </div>
  </footer>
</template>

<style>
.container {
  display: flex;
  justify-content: space-between;
}

.footer-section {
  flex: 1;
}
</style>
