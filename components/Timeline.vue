<template>
	<div class="w-full">
		<div
			v-for="item in items"
			:key="item.key"
			class="mt-8 flex"
			data-aos="slide-up">
			<h3
				v-if="item"
				class="hidden w-2/12 justify-end text-right text-2xl font-bold text-white sm:flex">
				{{ item.title }}
			</h3>

			<div class="relative flex w-1/12 flex-col items-center">
				<div class="tracker"></div>
			</div>

			<div
				v-if="item && item.texts && item.texts.length > 0"
				class="ml-4 pr-3 sm:w-9/12 md:ml-2">
				<h3
					v-if="item"
					class="mb-5 text-2xl font-bold text-white sm:hidden">
					{{ item.title }}
				</h3>
				<div
					v-if="item && item.texts && item.texts.length > 0"
					class="pr-3 sm:w-9/12">
					<p
						v-for="text in item.texts"
						:key="text.key"
						class="basic-text">
						{{ text.value }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { v4 as uuid } from 'uuid'

export default {
	name: 'TimelineComponent',
	props: {
		timelineItems: {
			type: Array,
			default: () => [],
		},
	},
	computed: {
		items() {
			return this.timelineItems.map((item) => {
				let texts = []
				if (item.texts) {
					texts = item.texts.map((text) => {
						return {
							...text,
							key: uuid(),
						}
					})
				}
				return {
					...item,
					texts,
					key: uuid(),
				}
			})
		},
	},
}
</script>

<style>
.tracker {
	width: 2px;
	background-color: white;
	height: 100%;
	border-radius: 3px;
}

.basic-text {
	@apply mb-3 leading-5 text-white;
}
</style>
