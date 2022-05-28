<template>
	<section
		id="team"
		class="relative">
		<img
			class="absolute top-[35%] left-0 w-2/3 max-w-[960px]"
			src="@/assets/images/team-7.svg"
			alt="Sakura" />
		<div class="container relative mx-auto px-8">
			<div class="mb-2 text-xl">チーム</div>
			<div class="mb-10 mb-12 text-6xl font-bold md:text-7xl xl:text-8xl">
				Team
			</div>
			<div class="flex flex-wrap">
				<div
					v-for="(member, idx) in team"
					:key="member.twitter"
					class="mb-20 w-full pr-8 sm:w-1/2 lg:w-1/3">
					<img
						class="mb-8 w-full"
						:src="member.avatar"
						:alt="member.name" />
					<div class="mb-2 text-2xl font-bold">
						{{ member.name }}
					</div>
					<div class="mb-2 font-bold text-primary">
						{{ member.twitter }}
					</div>
					<div class="font-lato mb-3 text-lg text-neutral-400">
						{{ member.role }}
					</div>
					<div class="font-lato text-lg text-light">
						{{ member.description }}
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import team from '@/assets/json/team.json'

export default {
	data: () => ({ team }),
}
</script>
