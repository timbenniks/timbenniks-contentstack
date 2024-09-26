<script setup lang="ts">
defineProps(["timelineItems"]);
</script>

<template>
  <div class="mx-8">
    <ol class="border-s border-white">
      <li v-for="item in timelineItems" :key="item.daterange" class="my-8">
        <nuxt-link :to="item.url" target="_blank">
          <div class="flex-start flex items-center pt-3">
            <div
              class="-ms-[5px] me-3 h-[9px] w-[9px] rounded-full bg-white"
            ></div>
            <p class="font-black" v-bind="item.cslp && item.cslp.date_range">
              {{ item.daterange }}
            </p>
          </div>

          <div class="mb-6 ms-4 mt-2">
            <h4
              class="mb-2 text-fancy-bg text-lg inline-block"
              v-bind="item.cslp && item.cslp.company"
            >
              {{ item.company }}
            </h4>
            <p class="font-black text-xl" v-bind="item.cslp && item.cslp.title">
              {{ item.title }}
            </p>
            <p
              class="text-sm mb-4 text-slate-400"
              v-bind="item.cslp && item.cslp.location"
            >
              {{ item.location }}
            </p>

            <p
              v-if="item.text != ''"
              class="text-sm text-slate-400"
              v-bind="item.cslp && item.cslp.description"
            >
              {{ item.text }}
            </p>
          </div>
        </nuxt-link>
      </li>
    </ol>
  </div>
</template>
