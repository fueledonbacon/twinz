<template>
	<section class="relative">
		<div class="container mx-auto px-8">
			<div class="mb-2 text-xl">ストラテジー</div>
			<div class="mb-10 flex flex-col md:flex-row">
				<div class="mb-4 text-6xl font-bold uppercase md:mb-0 md:w-2/5 lg:text-7xl">
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
						class="relative items-stretch overflow-hidden rounded-lg bg-white pt-[50%]">
						<img
							class="absolute top-0 left-0 h-full w-1/2"
							src="@/assets/images/rarities-1.jpg" />
						<div
							class="absolute top-0 right-0 flex h-full w-1/2 items-center justify-center p-16 uppercase">
							<div>
								<div class="mb-5 text-2xl text-light">クリエーター</div>
								<div class="mb-8 text-4xl font-bold text-dark">
									Creator<span class="text-primary">Z</span>
								</div>
								<div class="text-2xl font-bold text-neutral-400">
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
