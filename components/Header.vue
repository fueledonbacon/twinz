<template>
	<header
		class="fixed z-50 flex w-full items-center justify-center bg-dark px-8 py-5"
		:class="scrollY < 1 ? 'sm:bg-transparent' : 'backdrop-blur-md sm:bg-dark/75'">
		<ConnectModal />

		<div class="flex w-full items-center justify-between">
			<Logo />
			<!-- Desktop nav -->
			<nav class="hidden lg:flex">
				<ul class="flex items-center text-sm font-bold uppercase text-white">
					<li class="mr-8">
						<a href="/#story">Story</a>
					</li>
					<li class="mr-8">
						<a href="/#project">About Project</a>
					</li>
					<li class="mr-8">
						<a href="/#utilities">Utilities</a>
					</li>
					<li class="mr-8">
						<a href="/#parties">Parties</a>
					</li>
					<li class="mr-8">
						<a href="/#roadmap">Roadmap</a>
					</li>
					<li class="mr-8">
						<a href="/#team">Team</a>
					</li>
					<li class="mr-8">
						<a href="/#faq">FAQ</a>
					</li>
					<li>
						<a href="/#community">Community</a>
					</li>
				</ul>
			</nav>
			<div class="flex">
				<a class="mr-5 flex h-11 w-11 items-center justify-center bg-primary">
					<i class="fab fa-twitter text-2xl" />
				</a>
				<a class="flex h-11 w-11 items-center justify-center bg-primary">
					<i class="fab fa-discord text-2xl" />
				</a>
			</div>
			<!-- <ConnectButton/> -->
			<!-- Mobile menu -->
			<div class="flex justify-end lg:hidden">
				<button
					class="z-20 mr-4 text-white"
					@click="toggleNavigator">
					<i class="fas fa-bars text-2xl" />
				</button>
				<transition name="scale">
					<nav
						v-if="isNavigatorOpen"
						class="mobile-navigator absolute top-0 left-0 z-10 flex h-screen w-screen items-center justify-center rounded-lg p-5 text-3xl"
						:class="{
							'scale-in': isNavigatorOpen,
							'scale-out': !isNavigatorOpen,
						}">
						<ul class="flex flex-col text-center text-white">
							<li
								class="mb-3"
								@click="toggleNavigator">
								<a href="/#story">Story</a>
							</li>
							<li
								class="mb-3"
								@click="toggleNavigator">
								<a href="/#project">About Project</a>
							</li>
							<li
								class="mb-3"
								@click="toggleNavigator">
								<a href="/#utilities">Utilities</a>
							</li>
							<li
								class="mb-3"
								@click="toggleNavigator">
								<a href="/#parties">Parties</a>
							</li>
							<li
								class="mb-3"
								@click="toggleNavigator">
								<a href="/#roadmap">Roadmap</a>
							</li>
							<li
								class="mb-3"
								@click="toggleNavigator">
								<a href="/#team">Team</a>
							</li>
							<li
								class="mb-3"
								@click="toggleNavigator">
								<a href="/#faq">FAQ</a>
							</li>
							<li
								class="mb-3"
								@click="toggleNavigator">
								<a href="/#community">Community</a>
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
