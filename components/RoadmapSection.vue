<template>
  <section
    id="roadmap-section"
    class="flex flex-col items-center py-11 h-auto px-3 "
  >
    <div class="flex flex-col items-center  ">
      <h2 data-aos="slide-up" class="section-title text-4xl">Roadmap</h2>
      <Timeline :timeline-items="[...timelineItems]"/>
    </div>
  </section>
</template>

<script>


import timelineItems from '@/assets/json/timeline.json'
export default {
  data() {
    return {
      timelineItems: timelineItems
    }
  },
  computed: {
    
  },
}
</script>

<style scoped></style>
