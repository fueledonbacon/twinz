<template>
	<section class="relative py-16">
		<img
			class="absolute bottom-[-10vw] left-0 w-1/3 max-w-[450px]"
			src="@/assets/images/rarities-2.png"
			alt="Sakura" />
		<div class="container mx-auto px-8">
			<div class="mb-2 text-xl">ストラテジー</div>
			<div class="mb-10 flex flex-col md:flex-row">
				<div
					class="mb-4 text-6xl font-bold uppercase md:mb-0 md:w-2/5 md:text-7xl xl:text-8xl">
					Rarities
				</div>
				<div class="text-lg text-light md:w-3/5">
					TwinZ is a community represented by 5 different Societies that reflect the
					best of who we are IRL and more importantly who we can become in the
					Metaverse. Where barriers won’t exist and all are welcome. TwinZ is
					building bonds, cultivating connections, finding Futago and family.
				</div>
			</div>
			<Carousel
				v-model="currentPage"
				class="mx-auto max-w-[1200px]">
				<div
					v-for="idx in 5"
					:key="idx"
					class="px-4">
					<div
						class="relative items-stretch overflow-hidden rounded-lg bg-white pt-[200%] sm:pt-[50%]">
						<img
							class="absolute top-0 left-0 h-1/2 w-full sm:h-full sm:w-1/2"
							src="@/assets/images/rarities-1.jpg" />
						<div
							class="absolute bottom-0 right-0 flex h-1/2 w-full items-center justify-center p-6 uppercase sm:h-full sm:w-1/2 md:p-16">
							<div class="max-w-[280px] sm:max-w-full">
								<div class="mb-5 text-xl text-light md:text-2xl">クリエーター</div>
								<div class="mb-8 text-2xl font-bold text-dark md:text-4xl">
									Creator<span class="text-primary">Z</span>
								</div>
								<div class="text-xl font-bold text-neutral-400 md:text-2xl">
									The most creative artist, designers and developers
								</div>
							</div>
						</div>
					</div>
				</div>
			</Carousel>
		</div>
	</section>
</template>

<script>
export default {
	data: () => ({
		currentPage: 0,
	}),
}
</script>
