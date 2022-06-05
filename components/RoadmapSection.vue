<template>
	<section
		id="roadmap"
		class="relative py-16">
		<img
			class="absolute top-[25%] right-0 w-1/4 min-w-[120px] max-w-[250px]"
			src="@/assets/images/roadmap-1.png"
			alt="Sakura" />
		<img
			class="absolute top-[55%] left-0 w-1/3 min-w-[220px] max-w-[450px]"
			src="@/assets/images/roadmap-2.png"
			alt="Sakura" />
		<img
			class="absolute top-[95%] right-0 w-1/3 min-w-[220px] max-w-[450px]"
			src="@/assets/images/roadmap-3.png"
			alt="Sakura" />
		<div class="container mx-auto px-8">
			<div class="mb-2 text-xl">ロードマップ</div>
			<div class="mb-10 mb-8 text-6xl font-bold md:text-7xl xl:text-8xl">
				Roadmap
			</div>
			<div class="mb-12 flex flex-col text-lg font-bold sm:flex-row md:text-2xl">
				<div class="mb-4 w-full text-neutral-400 sm:mb-0 sm:w-1/2 sm:pr-4">
					An Extensive Roadmap was created to ensure a detailed buildout supporting
					the community and increasing value for the NFT.
				</div>
				<div class="w-full sm:w-1/2">
					As the community grows, we want to provide an outlet for diverse
					opportunities through social, artistic and entertainment channels.
				</div>
			</div>
			<RoadmapPhase
				v-for="(todo, idx) in roadmap"
				:key="todo.title"
				class="mb-8"
				:data="todo"
			/>
		</div>
	</section>
</template>

<script>
import roadmap from '@/assets/json/roadmap.json'
import RoadmapPhase from './RoadmapPhase.vue'

export default {
    data: () => ({ roadmap }),
    components: { RoadmapPhase }
}
</script>
