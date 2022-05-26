<template>
 <div class="space-y-5">
   				<div
				v v-for="(item, index) in items"
					:class="[index === openItemIndex ? 'opened' : '']"
					:key="`question_${index}`"
					class="
						faq-item
						relative
						overflow-hidden
						border-2 border-gray-200
						rounded-lg
						select-none

					">
					<h4
						@click="toggleAnswer(index)"
						class="
							flex
							items-center
							justify-between
							text-lg
							font-medium
						text-gray-200
							cursor-pointer
							sm:text-xl
							px-7
							py-7
							hover:text-gray-400
						">
						<span>{{ item.title }}</span>
						<svg
							class="w-6 h-6 transition-all duration-200 ease-out transform rotate-0"
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
					<p class=" hidden pt-0 -mt-2 text-gray-400 sm:text-lg py-7 px-7">
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
