<template>
  <section
    id="faq-section"
    class="flex flex-col items-center py-11 h-700px w-full px-3"
  >
    <div class="flex flex-col items-center w-full max-w-4xl">
      <h2 class="section-title">FAQ</h2>
      <div class="w-full">
        <Accordion :accordion-items="accordionItems"></Accordion>
      </div>
    </div>
  </section>
</template>

<script>
import Accordion from '@/components//Accordion.vue'
import questions from '@/assets/json/faq.json';

export default {
  components: {
    Accordion,
  },
  computed: {
    accordionItems() {
      return questions
    },
  },
}
</script>

<style scoped>

.section-title {
  @apply tracking-tight text-center text-slate-50 text-3xl shadow-sm mb-4; 

	font-family: 'Bowlby One';
}
</style>
