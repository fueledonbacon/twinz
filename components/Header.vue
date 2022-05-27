<template>
	<header
		:class="`bg-black ${
			scrollY < 1 ? 'sm:bg-transparent' : ''
		}  fixed z-50 flex w-full items-baseline justify-center px-3 py-3`">
		<ConnectModal />

		<div class="flex w-full items-baseline justify-between sm:w-11/12">
			<Logo />
			<!-- Desktop nav -->
			<nav class="hidden lg:flex">
				<ul class="flex items-center text-white">
					<li class="mr-8">
						<a
							class="text-lg xl:text-2xl"
							href="/#presentation-section"
							>Presentation</a
						>
					</li>
					<li class="mr-8">
						<a
							class="text-lg xl:text-2xl"
							href="/#roadmap-section"
							>Road Map</a
						>
					</li>
					<li class="mr-8">
						<a
							class="text-lg xl:text-2xl"
							href="/#team-section"
							>Our Team</a
						>
					</li>
					<li class="mr-8">
						<a
							class="text-lg xl:text-2xl"
							href="/#faq-section"
							>FAQ</a
						>
					</li>
					<li>
						<a
							class="text-lg xl:text-2xl"
							href="/whitelist"
							>Whitelist</a
						>
					</li>
				</ul>
			</nav>
			<ConnectButton />
			<!-- Mobile menu -->
			<div class="flex justify-end lg:hidden">
				<button
					class="z-20 text-white"
					@click="toggleNavigator"></button>
				<transition name="scale">
					<nav
						v-if="isNavigatorOpen"
						class="mobile-navigator absolute top-0 left-0 z-10 flex h-screen w-screen items-center justify-center rounded-lg p-5 text-3xl"
						:class="{
							'scale-in': isNavigatorOpen,
							'scale-out': !isNavigatorOpen,
						}">
						<ul class="flex flex-col text-center text-white">
							<li class="mb-3">
								<a href="/#presentation-section">The Forest</a>
							</li>
							<li class="mb-3">
								<a href="/#roadmap-section">Road Map</a>
							</li>
							<li class="mb-3">
								<a href="/#team-section">Our Team</a>
							</li>
							<li class="mb-3">
								<a href="/#faq-section">FAQ</a>
							</li>
							<li>
								<a href="/whitelist">Whitelist</a>
							</li>
							<li class="mt-8">
								<a
									href="https://discord.com/invite/"
									class="discord">
									<img
										class="mx-auto w-36"
										src="@/assets/images/discordBanner.png"
										alt="Discord" />
								</a>
							</li>
						</ul>
					</nav>
				</transition>
			</div>
		</div>
	</header>
</template>

<script>
export default {
	name: 'HeaderComponent',
	data() {
		return {
			isNavigatorOpen: false,
			scrollY: 0,
		}
	},
	computed: {},
	mounted() {
		window.addEventListener('scroll', (e) => {
			this.scrollY = window.scrollY
		})
	},
	methods: {
		toggleNavigator() {
			this.isNavigatorOpen = !this.isNavigatorOpen
		},
	},
}
</script>

<style scoped>
@keyframes scaleIn {
	from {
		transform: scale(0);
		opacity: 0;
	}
	to {
		transform: scale(1);
		opacity: 1;
	}
}
@keyframes scaleOut {
	from {
		transform: scale(1);
		opacity: 1;
	}
	to {
		transform: scale(0);
		opacity: 0;
	}
}

.mobile-navigator {
	transform-origin: top right;
	background-color: #111827ee;
}

.scale-enter-active {
	animation: scaleIn 0.3s ease-in;
}
.scale-leave-active {
	animation: scaleOut 0.3s ease-in;
}
</style>
