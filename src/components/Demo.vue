<script setup lang="ts">
import { useSummarizer } from "../composables/useSummarizer";
import { ref, onMounted, computed } from "vue";

type article = {
  url: string;
  summary: string;
};

type error = {
  data?: {
    error?: string;
  };
};

const isFetching = ref(false);
const error = ref<error | null>(null);
const copied = ref("");

const article = ref<article>({
  url: "https://time.com/6266679/musk-ai-open-letter/",
  summary: "",
});

const allArticles = ref<article[]>([]);

const handleSubmit = async () => {
  isFetching.value = true;

  const response = await useSummarizer(article.value.url);
  isFetching.value = false;

  if (response.summary) {
    const newArticle = { ...article.value, summary: response.summary };
    const updatedAllArticles = [newArticle, ...allArticles.value];
    article.value = newArticle;
    allArticles.value = updatedAllArticles;

    localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
  }
};

const handleCopy = (copyUrl: string) => {
  copied.value = copyUrl;
  navigator.clipboard.writeText(copyUrl);
  setTimeout(() => {
    copied.value = "";
  }, 2000);
};

onMounted(() => {
  const storage = localStorage.getItem("articles");

  if (storage) {
    const articlesFromLocalStorage = JSON.parse(storage);
    allArticles.value = articlesFromLocalStorage;
  }
});
</script>
<template>
  <section class="mt-16 w-full max-w-xl">
    <!-- The search component   -->
    <div class="flex flex-col w-full gap-2">
      <form
        @submit.prevent="handleSubmit"
        class="relative flex justify-center items-center"
      >
        <img
          src="/images/link.svg"
          alt="link_icon"
          class="absolute left-0 my-2 ml-3 w-5"
        />

        <input
          type="url"
          placeholder="Enter a link to summarize"
          v-model="article.url"
          class="url_input peer"
        />

        <button type="submit" class="submit_btn">↵</button>
      </form>

      <!-- * browse url history * -->
      <div
        class="flex flex-col gap-1 max-h-60 overflow-y-auto"
        v-for="(item, index) in allArticles"
        :key="`link-${index}`"
      >
        <div @click="article = item" class="link_card">
          <div class="copy_btn" @click="handleCopy(item.url)">
            <img
              :src="`/images/${copied === item.url ? 'tick' : 'copy'}.svg`"
              :alt="`${copied === item.url ? 'tick_icon' : 'copy_icon'}`"
              class="w-[40%] h-[40%] object-contain"
            />
          </div>
          <p
            class="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate"
          >
            {{ item.url }}
          </p>
        </div>
      </div>
    </div>
    <!--  Display results -->

    <div
      className="my-10 max0w-full flex justify-center items-center"
      v-if="isFetching"
    >
      <img
        src="/images/loader.svg"
        alt="loader"
        class="w-10 h-20 object-contain"
      />
    </div>
    <template v-else>
      <p class="font-inter font-bold text-black texst-center" v-if="error">
        Well, that`s not supposed to happen
        <br />
        <span class="font-satoshi font-normal text-gray-700">
          {{ error?.data?.error }}
        </span>
      </p>

      <div v-if="article.summary" class="flex flex-col gap-3 my-5">
        <h2 class="font-satoshi font-bold text-gray-6600 text-xl">
          Article
          <span class="blue_gradient">Summary</span>
        </h2>
        <div class="summary_box">
          <p class="font-inter font-medium text-sm text-gray-700">
            {{ article.summary }}
          </p>
        </div>
      </div>
    </template>
  </section>
</template>
