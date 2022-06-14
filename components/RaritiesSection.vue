<template>
	<section
		id="rarities"
		class="relative py-16">
		<img
			class="absolute bottom-[-10vw] left-0 w-1/3 max-w-[450px]"
			src="@/assets/images/rarities-effect.png"
			alt="Sakura" />
		<div class="container mx-auto px-8">
			<div class="mb-2 text-xl">ストラテジー</div>
			<div class="mb-10 flex flex-col md:flex-row">
				<div
					class="mb-4 text-6xl font-bold md:mb-0 md:w-2/5 md:text-7xl xl:text-8xl">
					Rarities
				</div>
				<div class="font-lato text-lg text-light md:w-3/5">
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
					v-for="slide in carouselData"
					:key="slide.image"
					class="px-4">
					<div
						class="relative items-stretch overflow-hidden rounded-lg bg-white pt-[160%] sm:pt-[40%]">
						<img
							class="absolute top-0 left-0 h-1/2 w-full sm:h-full sm:w-1/2"
							:src="slide.image" />
						<div
							class="absolute bottom-0 right-0 flex h-1/2 w-full items-center justify-center p-6 sm:h-full sm:w-1/2 md:p-16">
							<div class="max-w-[280px] sm:max-w-full">
								<div class="mb-3 lg:mb-5 text-xl text-light lg:text-2xl">クリエーター</div>
								<div class="mb-6 lg:mb-8 text-2xl font-bold text-dark lg:text-4xl">
									Creator<span class="text-primary">Z</span>
								</div>
								<div class="text-lg font-bold text-neutral-400 lg:text-2xl">
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
import CarouselImage1 from '@/assets/images/rarities-1.jpg'
import CarouselImage2 from '@/assets/images/rarities-2.jpg'
import CarouselImage3 from '@/assets/images/rarities-3.jpg'
import CarouselImage4 from '@/assets/images/rarities-4.jpg'
import CarouselImage5 from '@/assets/images/rarities-5.jpg'

const carouselData = [
	{ image: CarouselImage1 },
	{ image: CarouselImage2 },
	{ image: CarouselImage3 },
	{ image: CarouselImage4 },
	{ image: CarouselImage5 }
]

export default {
	data: () => ({
		currentPage: 0,
		carouselData,
	}),
}
</script>
