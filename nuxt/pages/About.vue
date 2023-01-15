<template>
  <div>
    <div class="relative hero-image-container">
      <img class="hero-image" src="https://images.unsplash.com/photo-1525275295302-38fe248cf44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1767&q=80" alt="hero image">
      <div class="hero-text">
        <h1 class=" text-8xl text-shadow-overlay">
          About Us
        </h1>
        <small class="text-xl">We love creating and problem solving!</small>
      </div>
    </div>
    <div class="container mt-3 text-xl flex flex-col">
      <div class="flex justify-evenly">
        <div class="">
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fuxwing.com%2Fwp-content%2Fthemes%2Fuxwing%2Fdownload%2Fbrands-and-social-media%2Fnuxt-js-icon.png&f=1&nofb=1&ipt=3bfe61f8ee84f675e88c0b6c549882da83468fc36f6222d8f3ad7f6140e7c32a&ipo=images" alt="nuxt icon" width="200">
        </div>
        <div class="">
          <img src="https://strapi-nuxt.apps.devopportunities.dev/admin/70674f63fc3904c20de0.svg" alt="nuxt icon" width="200">
        </div>
        <div class="">
          <img src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_tailwind_icon_130128.png" alt="nuxt icon" width="200">
        </div>
      </div>
      <div class="">
        <h2>
          The SunnyVibes project is an e-commerce application built using the Nuxt.js framework,  using Strapi as the headless CMS to handle the management of our product catalog, Tailwind CSS to provide a clean, minimalist design aesthetic and Stripe as .
          <br>
        </h2>

        <div class="my-5">
          <div class=" flex justify-center my-4">
            <h3 class="text-center text-3xl p-4 rounded-md border-4 w-1/2 border-slate-900">
              Our goal with this project
            </h3>
          </div>
          <ul class="  ">
            <li class=" list-item">
              Challenge ourselves in learning Nuxt.js, capitalizing on prior experience with Vue.js
            </li>
            <li class=" list-item">
              Build an e-commerce app with an actual payment system, utilizing Stripe for payments
            </li>
            <li class=" list-item">
              Experiment with Strapi as a headless CMS and explore its potential for our e-commerce app
            </li>
            <li class=" list-item">
              Practice and improve our problem-solving and development skills while working on this project
            </li>
            <li class=" list-item">
              Creating a seamless and intuitive e-commerce experience for users
            </li>
            <li class=" list-item">
              Leverage the power of Nuxt.js and Strapi to create a performant, scalable, and maintainable e-commerce platform
            </li>
            <li class=" list-item">
              Learn about the best practices for building e-commerce application
            </li>
            <li class=" list-item">
              Explore the features of Nuxt.js and Strapi that we haven't used before
            </li>
            <li class=" list-item">
              Use this project as an opportunity to learn new technologies and improve our development skills
            </li>
            <li class=" list-item">
              Showcase our skills and deliver a high-quality e-commerce application
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>e>

<script>
export default {
  setup () {
    onMounted(() => {

    })

    return {

    }
  }
}
</script>

<style>
.hero-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
  position: relative;
}
.hero-image-container::before {
  content: "";
  position: absolute;
  bottom: 0;
  z-index: 1999;
  left: 0;
  width: 100%;
  height: 10px; /* adjust height as per your need */
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), #fff); /* adjust the color as per your need */
}

.hero-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  text-align: center;
  color: #fff;
}

.text-shadow-overlay {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

</style>
