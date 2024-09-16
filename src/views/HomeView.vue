<script setup>
import { RouterLink } from 'vue-router'
import yummyGreekLogo from '@/assets/yummy-greek-logo.png'
import allExclusiveAwardLogo from '@/assets/award.webp'
</script>

<template>
  <main class="main--centered main__homeview">
    <!-------------- Introduction Section -------------->
    <!-- Name of the restaurant  -->
    <h1 class="title title--xl mt-12 mb-8">YummyGreek</h1>

    <!-- Logo of the restaurant  -->
    <img
      :src="yummyGreekLogo"
      alt="An illustrated Souvlaki logo with olive branches and Greek patterns"
      class="icon__logo"
    />
    <p class="text--large text-center text-white">
      The gourmands order before... <br />they get
      <span class="text-yellow font-bold">hungry</span>
    </p>
    <!-- Menu button: navigates the user to the Menu page -->
    <RouterLink to="/menu" class="btn btn--primary btn--big">Order Now!</RouterLink>

    <!-------------- Award Section -------------->
    <div class="flex flex-col items-center m-5 pt-5 border-t border-grey">
      <!-- Logo of the Golden Award won by the restaurant, recognizing its inclusivity -->
      <img
        :src="allExclusiveAwardLogo"
        alt="Golden Award Logo Without Exclusions"
        class="icon__award"
      />
      <p class="text-lightGrey text-center">
        Golden Award <br /><span class="text-yellow font-semibold">"Without Exclusions"</span>
      </p>
    </div>
  </main>
</template>
