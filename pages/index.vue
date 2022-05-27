<template>
	<div
		id="app"
		class="min-h-screen w-full bg-dark text-white">
		<main class="w-full">
			<HeroOpSection />
			<StorySection />
			<div class="container mx-auto px-8">
				<a class="w-56 bg-primary px-6 py-5 font-bold uppercase">
					Twinz Newspaper
				</a>
			</div>
			<TeamSection />
			<RoadmapSection />
			<FaqSection />
		</main>
	</div>
</template>
<script>
export default {
	name: 'Test',
	data() {
		return {}
	},
}
</script>
