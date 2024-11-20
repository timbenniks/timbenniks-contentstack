<script setup lang="ts">
defineProps(["deets", "title", "cslp"]);
</script>

<template>
  <div class="p-4 md:p-8 mb-8">
    <h3
      class="title page-title inline-block mb-6"
      v-if="title"
      v-bind="cslp && cslp.title"
    >
      {{ title }}
    </h3>
    <div class="bg-[#0e1029] p-4 md:p-8">
      <ul class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <li v-for="dd in deets" :key="dd.detail.label">
          <dl>
            <dt
              class="text-xl font-black text-pink-500 mb-2"
              v-bind="dd.detail.cslp && dd.detail.cslp.label"
            >
              {{ dd.detail.label }}
            </dt>
            <dd class="text-xl" v-if="dd.detail.link.href">
              <a :href="dd.detail.link.href" target="_blank" rel="noopener">{{
                dd.detail?.value
              }}</a>
            </dd>
            <dd
              class="text-xl"
              v-else
              v-bind="dd.detail.value && dd.detail.cslp && dd.detail.cslp.value"
            >
              {{ dd.detail?.value }}
            </dd>
          </dl>
        </li>
      </ul>
    </div>
  </div>
</template>
