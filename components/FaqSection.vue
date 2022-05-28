<template>
	<section
		id="faq-section"
		class="h-700px container mx-auto flex w-full flex-col py-32 px-8">
		<div class="mb-2 text-xl">質問</div>
		<div class="mb-10 mb-8 text-6xl font-bold uppercase md:text-7xl xl:text-8xl">
			FAQ
		</div>
		<div class="mb-8 max-w-3xl text-3xl font-bold uppercase text-neutral-400">
			If your question isn’t answered below, you can reach out to us on Twitter or
			Discord
		</div>
		<Accordion
			class="w-full"
			:accordion-items="accordionItems" />
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
