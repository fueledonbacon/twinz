<template>
	<button
		type="button"
		class="m-2 inline-flex h-12 items-center rounded-full border border-transparent bg-indigo-400 px-8 text-base font-bold leading-6 text-white transition duration-150 ease-in-out hover:bg-indigo-700 focus:outline-none active:bg-indigo-700">
		<slot />
	</button>
</template>
<script>
export default {
	name: 'PillButton',
}
</script>
