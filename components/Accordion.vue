<template>
	<div class="border-t border-neutral-400">
		<div
			v
			v-for="(item, index) in items"
			:class="[index === openItemIndex ? 'opened' : '']"
			:key="`question_${index}`"
			class="faq-item relative select-none overflow-hidden border-b border-neutral-400">
			<h4
				@click="toggleAnswer(index)"
				class="flex cursor-pointer items-center justify-between py-7 text-lg font-medium text-white hover:text-neutral-400 sm:text-2xl">
				<span>{{ item.title }}</span>
				<svg
					class="h-8 w-8 rotate-0 transform text-primary transition-all duration-200 ease-out"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
				</svg>
			</h4>
			<p class="font-lato -mt-2 hidden pb-7 text-light sm:text-lg">
				{{ item.description }}
			</p>
		</div>
	</div>
</template>

<script>
import { v4 as uuid } from 'uuid'

export default {
	name: 'AccordionComponent',
	props: {
		accordionItems: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			openItemIndex: -1,
		}
	},
	computed: {
		items() {
			return this.accordionItems.map((item) => {
				const newItem = { ...item }
				newItem.key = uuid()
				return newItem
			})
		},
	},
	methods: {
		toggleAnswer(index) {
			if (this.openItemIndex === index) {
				this.openItemIndex = -1
			} else {
				this.openItemIndex = index
			}
		},
	},
}
</script>

<style scoped>
.faq-item.opened > p {
	@apply block;
}
.faq-item.opened > h4 > svg {
	@apply -rotate-45;
}
/* .title-container,
.description-container {
  padding: 0.625rem 0;
  transform-origin: top;
}
.title-container{
  border-bottom: 1px solid #f2994a;
}

.orange {
  color: #f2994a;
} */

@keyframes slide-down {
	from {
		transform: scaleY(0);
	}
	to {
		transform: scaleY(1);
	}
}

@keyframes slide-up {
	from {
		transform: scaleY(1);
	}
	to {
		transform: scaleY(0);
	}
}

.slide-enter-active {
	animation: slide-down 0.3s ease-in;
}
.slide-leave-active {
	animation: slide-up 0.3s ease-in;
}
</style>
