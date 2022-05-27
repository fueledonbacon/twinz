<template>
	<div class="relative py-16">
		<img
			class="absolute bottom-0 right-0 w-1/5 min-w-[240px] max-w-[300px]"
			src="@/assets/images/features-1.png"
			alt="Sakura" />
		<div class="container relative mx-auto flex px-8">
			<div class="hidden w-2/5 flex-shrink-0 pt-10 md:block">
				<div
					v-for="(feature, idx) in features"
					:key="feature"
					class="relative mb-10 text-4xl font-bold duration-300 before:absolute before:top-[50%] before:translate-y-[-50%] before:rounded-full before:bg-primary before:duration-300 before:content-['']"
					:class="{
						'before:left-[-24px] before:h-12 before:w-12': currentPage === idx,
						'opacity-50 before:left-0 before:h-0 before:w-0': currentPage !== idx,
					}">
					<span class="relative"> {{ feature }} </span>
				</div>
			</div>
			<Carousel
				v-model="currentPage"
				class="flex-grow">
				<div class="border-y border-y-light pt-10 pb-16 text-lg text-light">
					<div class="mb-6 text-4xl font-bold md:hidden">
						{{ features[0] }}
					</div>

					Once all 10,000 PFPs have been minted a new Staking feature will be added
					to our website. The Staking feature will allow owners to earn additional
					rewards for their Diamond Hands commitment to the TwinZ community. Any
					TwinZ owner can stake their NFT. Owners that have matched TwinZ will earn
					more rewards. Rewards for Staked TwinZ can be tracked through our website
					and Discord when Staking goes Live. You maintain ownership of your NFT even
					while staked and you can Un-Stake your NFT at any time. Rewards are
					airdropped monthly to your wallet if your NFT is Staked the entire month.
					Staking will benefit the TwinZ community by supporting the floor price when
					reducing the amount of NFTs available for purchase, theoretically
					increasing value of demand by reducing the supply. More importantly TwinZ
					wants to build a long-term community of HODLers which strengthen the bonds
					of individuals who participate. The stronger the community, the longer the
					commitment, the better Utility value is achieved.
				</div>
				<div class="border-y border-y-light pb-16 pt-10 text-lg text-light">
					<div class="mb-6 text-4xl font-bold md:hidden">
						{{ features[1] }}
					</div>

					Owning a TwinZ NFT is a great opportunity to join a unique community of
					diverse and yet similar people. The best part is the fun participating in
					TwinZ gamification. TwinZ have different levels of rarity based on their
					traits and attributes. Collecting unique and rare TwinZ will provide value
					to the owner.
					<br />
					Owners willing to match sets of TwinZ have an opportunity for additional
					rewards. TwinZ owners must decide to sell their NFT, HODL or collect sets
					of TwinZ NFTs and stake them. Combine strategy with game theory to maximize
					your experience. The real game begins as our TwinZ community interacts,
					builds bonds, and grows value.
				</div>
				<div class="border-y border-y-light pb-16 pt-10 text-lg text-light">
					<div class="mb-6 text-4xl font-bold md:hidden">
						{{ features[2] }}
					</div>

					<div class="mb-8 text-2xl text-white">
						Our diverse community across 5 Different Societies creates multiple
						opportunities for contest and games.
					</div>
					<ol class="list-disc pl-6">
						<li>The CreatorZ Society will offer contest for art and manga.</li>
						<li>EntertainerZ Society will offer musical and performance contest.</li>
						<li>GeniuZ Society will provide trivia, puzzles, and other contest.</li>
						<li>
							High RollerZ Society will sponsor Casino Nights and Sports Nights.
						</li>
						<li>
							The WarriorZ offer a unique opportunity for IRL and Metaverse contest to
							test your endurance, power, and strength.
						</li>
						<li>
							The TwinZ team is already developing an immersive gaming platform in the
							Metaverse that features both PvP battles and PvE missions.
						</li>
						<li>
							TwinZ will offer a range of earning mechanisms for P2E gaming. The
							diverse TwinZ societies will battle for ultimate supremacy or build
							strategic alignments for survival.
						</li>
					</ol>
				</div>
				<div class="border-y border-y-light pb-16 pt-10 text-lg text-light">
					<div class="mb-6 text-4xl font-bold md:hidden">
						{{ features[3] }}
					</div>

					The Metaverse blurs the lines between IRL and Metaverse. By creating a
					TwinZverse within the Metaverse our community can flourish without
					boundaries. The Metaverse is an evolving and rapidly changing space with
					new platform developments every week.
					<br />
					Our community can decide together where TwinZ belongs and what Metaverse
					platforms we want to participate it. Funds from the Treasury will be
					dedicated to purchasing land and building out the TwinZverse. Special
					events will be held in the TwinZverse to enrich our community. Most
					importantly it will be a great place to gather and have fun.
				</div>
				<div class="border-y border-y-light pb-16 pt-10 text-lg text-light">
					<div class="mb-6 text-4xl font-bold md:hidden">
						{{ features[4] }}
					</div>

					The TwinZ team is creating the Futago Marketplace. Our focus is to reward
					the community and a great way to do that is giving access to a marketplace
					to spend the TwinZ Tokens you earn. As we Collab with other projects we
					will list Whitelist Opportunities and Giveaways in the Futago Marketplace.
					<br />
					When we hold IRL and Metaverse Events we will provide special access passes
					through the Marketplace. Exclusive TwinZ merch drops will be sold only
					through the Marketplace. Special accessories, tools, and functions to
					enhance your TwinZ will be released in the Marketplace. When the TwinZ
					Gaming Platform is launched we will offer in-game items and assets for
					improved playability and experience.
				</div>
			</Carousel>
		</div>
	</div>
</template>

<script>
const features = ['Staking', 'Collecting', 'Gaming', 'Metaverse', 'Marketplace']

export default {
	data: () => ({
		features,
		currentPage: 0,
	}),
}
</script>
