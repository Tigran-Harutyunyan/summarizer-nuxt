<script setup lang="ts">
const handleClick = () => {
  window.open("https://bitbucket.org/h_tigran/summarizer/src/main/");
};
</script>

<template>
  <header class="w-full flex justify-center items-center flex-col">
    <nav class="flex justify-between items-center w-full mb-10 pt-3">
      <img src="/images/logo.svg" alt="sumz_logo" class="w-28 object-contain" />

      <button type="button" @click="handleClick()" class="black_btn">
        Source
      </button>
    </nav>

    <h1 class="head_text">
      Summarize Articles with <br class="max-md:hidden" />
      <span class="orange_gradient">OpenAI GPT-4</span>
    </h1>

    <h2 class="desc">
      Simply your reading links, an open-source article summarizer that
      transforms lengthy articles into clear and consise summaries
    </h2>
  </header>
</template>
