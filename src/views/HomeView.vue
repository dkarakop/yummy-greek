<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="flex flex-col items-center bg-darkBlue rounded-lg m-3">
    <h1
      class="mt-12 text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-9xl leading-none tracking-tight text-yellow mb-8"
    >
      YummyGreek
    </h1>
    <img
      src="../components/icons/yummy-greek-logo.png"
      alt="An illustrated Souvlaki logo with olive branches and Greek patterns"
      class="w-32 mt-3 sm:w-48 md:w-64 lg:w-80 xl:w-96 object-cover mb-4"
    />
    <p
      class="text-lightGrey text-base text-center sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2"
    >
      The gourmands order before... <br />they get
      <span class="text-yellow font-bold">hungry</span>
    </p>

    <RouterLink
      to="/menu"
      class="px-10 py-5 m-3 text-lightGrey font-bold text-base text-center mb-20 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl bg-green hover:bg-lightGreen hover:text-black hover:underline hover:decoration-solid hover:ring-4 hover:ring-yellow focus:ring-4 focus:outline-none focus:ring-yellow focus:underline focus:decoration-solid rounded-lg text-center"
      >Order Now!</RouterLink
    >
    <div class="flex flex-col items-center m-5 pt-5 border-t border-grey">
      <img
        src="../components/icons/award.webp"
        alt="Golden Award Logo Without Exclusions"
        class="rounded-full border-4 border-lightGrey w-16 sm:w-16 md:w-20 lg:w-24 xl:w-28 object-cover"
      />
      <p class="text-lightGrey text-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
        Golden Award <br /><span class="text-yellow font-semibold">"Without Exclusions"</span>
      </p>
    </div>
  </main>
</template>
