<template>
	<div class="carousel">
		<div class="mb-4 flex justify-between">
			<div />
			<div class="ml-auto">
				<button
					class="mr-2 inline-flex h-6 w-6 items-center justify-center"
					:disabled="value <= 0"
					@click="prevPage">
					<i
						class="fas fa-chevron-left"
						:class="{ 'text-neutral-400': value <= 0 }" />
				</button>
				<button
					class="inline-flex h-6 w-6 items-center justify-center"
					:disabled="value >= totalCount - 1"
					@click="nextPage">
					<i
						class="fas fa-chevron-right"
						:class="{ 'text-neutral-400': value >= totalCount - 1 }" />
				</button>
			</div>
		</div>
		<div
			class="carousel__contents flex items-stretch"
			:style="contentStyles">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	props: {
		value: {
			type: Number,
			default: 0,
		},
	},
	computed: {
		totalCount() {
			return this.$slots.default?.length || 0
		},
		contentStyles() {
			return {
				'width': this.totalCount * 100 + '%',
				'transform': `translateX(${(-100 * this.value) / (this.totalCount || 1)}%)`,
				'--item-width': 100 / (this.totalCount || 1) + '%',
			}
		},
	},
	methods: {
		prevPage() {
			this.$emit('input', this.value - 1)
		},
		nextPage() {
			this.$emit('input', this.value + 1)
		},
	},
}
</script>

<style scoped>
.carousel {
	overflow-x: hidden;
}
.carousel__contents {
	transition: all 0.3s;
}
.carousel__contents > * {
	width: var(--item-width);
}
</style>
