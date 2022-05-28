<template>
	<div class="relative py-16">
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
			<div class="mb-10 mb-8 text-6xl font-bold uppercase md:text-7xl xl:text-8xl">
				Roadmap
			</div>
			<div
				class="mb-12 flex flex-col text-lg font-bold uppercase sm:flex-row md:text-2xl">
				<div class="mb-4 w-full text-neutral-400 sm:mb-0 sm:w-1/2 sm:pr-4">
					An Extensive Roadmap was created to ensure a detailed buildout supporting
					the community and increasing value for the NFT.
				</div>
				<div class="w-full sm:w-1/2">
					As the community grows, we want to provide an outlet for diverse
					opportunities through social, artistic and entertainment channels.
				</div>
			</div>
			<div
				v-for="(todo, idx) in roadmap"
				:key="todo.title"
				class="mb-8 flex flex-col rounded-tr-3xl px-8 pt-4 pb-6 sm:rounded-tr-[150px] sm:px-24 sm:pt-16 sm:pb-20 md:flex-row"
				:class="{
					'bg-primary': !idx,
					'bg-neutral-400/10 backdrop-blur-md': idx,
				}">
				<div class="mb-5 w-full text-xl font-bold uppercase sm:text-4xl md:w-2/5">
					<div class="lg:w-2/3">
						<span class="inline-block whitespace-nowrap">
							{{ todo.title }} -&nbsp;
						</span>
						<span class="inline-block whitespace-nowrap"> {{ todo.period }} </span>
					</div>
				</div>
				<div class="w-full text-sm sm:text-lg md:w-3/5">
					{{ todo.todo }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import roadmap from '@/assets/json/roadmap.json'

export default {
	data: () => ({ roadmap }),
}
</script>
