<script setup lang="ts">
import { format, getYear, isFuture } from "date-fns";

const props = defineProps(["talks", "small", "title"]);

const smallOrBigClass = computed(() => {
  return props.small
    ? "grid grid-cols-1 md:grid-cols-1 gap-6"
    : "grid grid-cols-1 md:grid-cols-3 gap-6";
});

function d(date: string) {
  return {
    year: getYear(date),
    month: format(new Date(date), "MMM"),
    day: format(new Date(date), "dd"),
  };
}

function upcoming(date: string) {
  return isFuture(new Date(date));
}
</script>

<template>
  <div class="px-4 md:px-8 mb-8">
    <h3 v-if="title" class="title inline-block mb-4">
      {{ title }}
    </h3>

    <ul :class="smallOrBigClass">
      <li v-for="talk in talks" :key="talk.id" class="mb-2">
        <NuxtLink
          :to="talk.link"
          target="_blank"
          class="flex flex-row space-x-4"
        >
          <div
            class="bg-[#0e1029] w-20 h-28 text-center font-black uppercase flex flex-col justify-center date-card"
          >
            <p class="text-4xl">{{ d(talk.date).day }}</p>
            <p class="text-lg">{{ d(talk.date).month }}</p>
            <p class="text-lg">{{ d(talk.date).year }}</p>
          </div>
          <div class="flex flex-col justify-start w-80">
            <p
              class="flowing-title font-bold text-sm"
              v-if="upcoming(talk.date)"
            >
              UPCOMING
            </p>
            <p class="font-bold text-xl">{{ talk.conference }}</p>
            <p class="line-clamp-1">
              {{ talk.talk }}
            </p>
            <p class="text-sm text-slate-400">{{ talk.location }}</p>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
