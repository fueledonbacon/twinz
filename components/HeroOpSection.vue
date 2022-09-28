<template>
	<div class="relative">
		<img class="absolute top-10 right-0 w-1/3 max-w-[400px] md:z-10" src="@/assets/images/hero-1.png"
			alt="Sakura" />
		<img class="absolute bottom-[15%] left-0 w-1/5 max-w-[300px]" src="@/assets/images/hero-2.png" alt="Sakura" />
		<div class="container mx-auto px-8 pt-36 pb-16 md:pt-60 md:pb-24">
			<div class="mb-20 flex flex-row-reverse items-start justify-start md:mb-32">
				<div class="relative hidden w-2/5 pt-[40%] lg:block">
					<img class="absolute top-[-10%] right-[80%] w-3/5" src="@/assets/images/hero-gate-back.svg"
						alt="Gate Back Pattern" />
					<div class="absolute top-0 left-0 w-full rounded-full bg-zinc-800 pt-[100%]" />
					<img class="absolute bottom-[90%] right-[105%] w-1/5" src="@/assets/images/hero-leave.png"
						alt="Leave" />
					<img class="absolute top-0 left-0 z-20 w-full" src="@/assets/images/hero-gate.svg" alt="Gate" />
				</div>
				<div class="w-100 relative lg:w-3/5">
					<div class="mb-2 font-bold italic text-light">
						Come Join The TwinZ Community
					</div>
					<div class="mb-8 text-4xl font-bold sm:text-5xl md:text-6xl">
						Double the fun with double the rewards Because
						<span class="text-primary">Twin</span>ning is winning!
					</div>
					<div class="flex flex-col items-center sm:flex-row">
						<a @click.prevent="mintNft"
							class="mb-4 w-60 border border-solid border-primary bg-primary px-9 py-5 text-center font-bold sm:mb-0 sm:mr-8 hover:cursor-pointer">
							Mint Founder's NFT
						</a>
						<a
							class="w-60 border border-solid border-primary px-9 py-5 text-center font-bold text-primary duration-300 hover:bg-primary hover:text-white hover:cursor-pointer">
							Discord Open Soon
						</a>
					</div>
				</div>
			</div>
			<div class="z-1 font-lato relative flex flex-col text-light sm:flex-row">
				<div class="mb-4 border-l-4 border-l-primary px-6 py-2 sm:mb-0 sm:w-1/3">
					<div class="max-w-2/3">
						TwinZ is a collection of 10,000 digital individuals living as NFTs
					</div>
				</div>
				<div class="mb-4 border-l-4 border-l-primary px-6 py-2 sm:mb-0 sm:w-1/3">
					<div class="max-w-2/3">
						5 different societies with completely different visual atmospheres
					</div>
				</div>
				<div class="border-l-4 border-l-primary px-6 py-2 sm:w-1/3">
					<div class="max-w-2/3">
						Member of TwinZ are eligible for monthly airdrops of "Royalty Rewards".
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { generateProof } from '@/utils/merkle-proof'
import whitelistAddresses from '@/assets/json/addresses.json'
import { getParsedEthersError } from "@enzoferey/ethers-error-parser";

export default {
	name: 'HeroOpSection',
	methods: {
		async mintNft() {
			try {
				const proof = await generateProof(this.$wallet.account, whitelistAddresses)
				const contract = await this.$wallet.getContract()
				const price = await contract.price();
				const response = await contract.whitelistMint(proof, { value: price })
				this.$toast.show(`You have claimed a founder's pass NFT, thanks for minting!`, {
					variant: 'success',
					action: {
						text: 'Close',
						onClick: (e, toastObject) => {
							toastObject.goAway(0)
						},
					},
				})
			} catch (e) {
				let message = "Something went wrong! "
				try {
					const { context } = getParsedEthersError(e);
					switch(context){
						case "ALREADY_MINTED":
						  message = "Looks like you've already minted. No use doing it again!"
						  break;
						default:
							// do nothing
					}

				} catch (e) {
					console.debug(e)
				}

				this.$toast.error(message, {
					variant: 'danger',
					action: {
						text: 'Close',
						onClick: (e, toastObject) => {
							toastObject.goAway(0)
						},
					},
				})
			}
		}
	}
}
</script>