<template>
  <div class="w-full">
    <div
      v-for="item in items"
      :key="item.key"
      class="flex mt-8"
      data-aos="slide-up"
    >
      <h3
        v-if="item"
        class="hidden w-2/12 sm:flex justify-end text-white text-2xl font-bold text-right"
      >
        {{ item.title }}
      </h3>

      <div class="w-1/12 flex flex-col items-center relative">
        <div class="tracker"></div>
      </div>

      <div
        v-if="item && item.texts && item.texts.length > 0"
        class="sm:w-9/12 pr-3 ml-4  md:ml-2"
      >
        <h3 v-if="item" class="sm:hidden text-white text-2xl font-bold mb-5">
          {{ item.title }}
        </h3>
       <div
        v-if="item && item.texts && item.texts.length > 0"
        class="sm:w-9/12 pr-3"
      >
        <p v-for="text in item.texts" :key="text.key" class="basic-text">

          {{ text.value }}
        </p>
      </div>
      </div>

    </div>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid'


export default {
  name: 'TimelineComponent',
  props: {
    timelineItems: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
 items() {
      return this.timelineItems.map((item) => {
        let texts = []
        if (item.texts) {
          texts = item.texts.map((text) => {
            return {
              ...text,
              key: uuid(),
            }
          })
        }
        return {
          ...item,
          texts,
          key: uuid(),
        }
      })
    },
  },
}
</script>

<style>
.tracker {
  width: 2px;
  background-color: white;
  height: 100%;
  border-radius: 3px;
}

.basic-text {
  @apply text-white mb-3 leading-5
  
}
</style>
