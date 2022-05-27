<template>
	<section
		id="faq-section"
		class="h-700px flex w-full flex-col items-center py-11 px-3">
		<div class="flex w-full max-w-4xl flex-col items-center">
			<h2 class="section-title">FAQ</h2>
			<div class="w-full">
				<Accordion :accordion-items="accordionItems"></Accordion>
			</div>
		</div>
	</section>
</template>

<script>
import Accordion from '@/components//Accordion.vue'
import questions from '@/assets/json/faq.json'

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
	@apply mb-4 text-center text-3xl tracking-tight text-slate-50 shadow-sm;

	font-family: 'Bowlby One';
}
</style>
