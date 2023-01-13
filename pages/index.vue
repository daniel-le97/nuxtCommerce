<template>
  <div class="container ">
    <h1 class="text-4xl">
      Welcome to your sidebase app!
    </h1>
    <p>
      Checkout the page protected by `nuxt-auth` here:
      <nuxt-link to="/protected" class="underline text-blue">
        Click me to test the auth setup!
      </nuxt-link>
    </p>
  </div>
</template>
