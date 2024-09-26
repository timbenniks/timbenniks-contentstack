<script setup lang="ts">
defineProps(["faqs", "big", "title"]);
</script>

<template>
  <div itemscope itemtype="https://schema.org/FAQPage">
    <template v-if="!big">
      <h4 class="title inline-block small mb-4">
        {{ title }}
      </h4>
      <ul class="bg-[#0e1029] pt-4 pb-1 px-4">
        <li
          v-for="faq in faqs"
          :key="faq.question"
          itemscope
          itemprop="mainEntity"
          itemtype="https://schema.org/Question"
        >
          <details class="mb-4">
            <summary
              class="bg-[#1b1d39] hover:opacity-90 py-2 px-4 cursor-pointer font-bold"
              itemprop="name"
              v-bind="faq.cslp && faq.cslp.question"
            >
              {{ faq.question }}
            </summary>

            <div
              itemscope
              itemprop="acceptedAnswer"
              itemtype="https://schema.org/Answer"
              class="text-sm my-4 px-4 text-slate-400"
            >
              <div
                itemprop="text"
                v-html="faq.answer"
                v-bind="faq.cslp && faq.cslp.answer"
              />
            </div>
          </details>
        </li>
      </ul>
    </template>
    <template v-else>
      <div class="pb-12 px-8">
        <h3 class="title inline-block small mb-8">
          {{ title }}
        </h3>
        <ul>
          <li
            v-for="faq in faqs"
            :key="faq.question"
            itemscope
            itemprop="mainEntity"
            itemtype="https://schema.org/Question"
            class="px-4 py-2 mb-4 bg-[#0e1029]"
          >
            <h4
              class="font-black text-2xl mb-4"
              v-bind="faq.cslp && faq.cslp.question"
            >
              {{ faq.question }}
            </h4>
            <div
              itemscope
              itemprop="acceptedAnswer"
              itemtype="https://schema.org/Answer"
              class="text-slate-400 mb-4"
            >
              <div
                itemprop="text"
                v-html="faq.answer"
                v-bind="faq.cslp && faq.cslp.answer"
              />
            </div>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>
