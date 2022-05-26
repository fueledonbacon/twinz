<template>
	<supply-check class="-mt-2 text-white">
		<div class="mt-12">
			<div v-if="shouldShowMintButtons" class="flex flex-col items-center">

				<div v-if="isPresaleActive && isPresaleVerified">
					<quantity-selector
						v-model="presaleQuantity"
						:min="1"
						:max="PRESALE_LIMIT"
					/>
					<pill-button @click.native="handleMint('presale')">Whitelist Mint </pill-button>
				</div>
				<div v-if="isPublicSaleActive">
					<quantity-selector
							v-model="publicQuantity"
							:min="1"
							:max="PUBLIC_LIMIT"
						/>
			
					<pill-button @click.native="handleMint('public')"> Mint </pill-button>
				</div>
			</div>

		<div class="mb-8 max-w-sm mx-auto text-center" v-else>
      <div>
        <span
          v-if="isPublicSaleActive || isPresaleActive"
        >
          The current sale is not accessible to this address
        </span>
        <span v-else> There is no active sales phase right now </span>
      </div>
    </div>
		</div>
	</supply-check>
</template>

<script>
import { ethers } from 'ethers'
import { generateProof } from '@/utils/merkle-proof.js'
import whitelist from '@/assets/json/whitelist.json'
import errorMessages from '@/utils/errorMessages.js'


export default {
	data() {
		return {
			presaleQuantity: 3,
			publicQuantity: 5,
			isBusy: false,
		}
	},
	async mounted() {
		console.log(`ESTADO: ${this.isPublicSaleActive}`);
		this.$wallet.contractState = this.userContractRelationship.bind(this)
	},
	computed: {
		shouldShowMintButtons() {
      return (
        this.isPublicSaleActive ||
        (this.isPresaleActive && this.isPresaleVerified)
      )
    },
		totalSupply() {
			return this.$store.state.contract.totalSupply
		},
		collectionSize() {
			return this.$store.state.contract.collectionSize
		},
		soldOut() {
			return this.initialized && this.totalSupply >= this.collectionSize
		},
		 isPresaleActive() {
      return this.$store.state.contract.presaleActive
    },
		isPublicSaleActive() {
      return this.$store.state.contract.publicSaleActive
    },
		isPresaleVerified() {
      return this.$store.state.contract.presaleListVerified
    },
		PUBLIC_PRICE() {
      return this.$store.state.contract.PUBLIC_PRICE
    },
    PRESALE_PRICE() {
      return this.$store.state.contract.PRESALE_PRICE
    },
    PUBLIC_LIMIT() {
      return this.$store.state.contract.PUBLIC_LIMIT
    },
    PRESALE_LIMIT() {
      return this.$store.state.contract.PRESALE_LIMIT
    },

	},
	methods: {
		async userContractRelationship() {
			this.$store.commit(
				'contract/setPresaleListVerified',
				await this.verifyPresale()
			)
		},

		mintToast(variant, message) {
				this.$toast.show(message, {
					action: {
						text: 'Close',
						variant: variant,
						onClick: (e, toastObject) => {
							toastObject.goAway(0)
						},
					},
				})
		},

		async verifyPresale(toast = false) {
			try {
				const contract = await this.$wallet.getContract()
				const proof = await generateProof(this.$wallet.account, whitelist)
				const response = await contract.verifyPresale(proof, this.$wallet.account)
				if (toast)
        	this.mintToast(
            'success',
            response
              ? 'Wallet address is on the presale list!'
              : 'Wallet address is NOT on the presale list.'
          )
				return response
			} catch (e) {
				console.log(e)
			}
		},
		async presaleMint() {
					if (!this.isPresaleActive) {
						this.mintToast('error', 'Presale is not active right now.')
						return
					}
					try {
						const nftContract = await this.$wallet.getContract()
						const value = ethers.utils.parseEther(
							(this.PRESALE_PRICE * this.presaleQuantity).toString()
						)
						const proof = await generateProof(this.$wallet.account, whitelist)
						return nftContract.presaleMint(proof, this.presaleQuantity, { value })
					} catch (e) {
						console.log(e)
					}
				},

		async publicMint(){
			const nftContract = await this.$wallet.getContract()
			const value = ethers.utils.parseEther(
					(this.PUBLIC_PRICE * this.publicQuantity).toString()
			)
			const txResponse = await nftContract.mint(this.publicQuantity, { value })
			
			return txResponse
				
		},
		async handleMint(type = 'public') {

			this.isBusy = true
			try {
				const nftContract = await this.$wallet.getContract()
				if (!this.$wallet.account) {
					await this.$wallet.connect()
				}
				let txResponse
       
				switch (type) {
          case 'presale':
            txResponse = await this.presaleMint()
            break
          case 'public':
          default:
            txResponse = await this.publicMint()
        }
	
				this.mintToast(
					'success',
					'Minted successfully! Wait for transaction to clear.'
        )
				txResponse.wait().then((res) => {
					console.log({ res })
					this.mintToast(
            'success',
            'Mint transaction confirmed. NFT should be in your wallet now!'
          )
				})
			} catch (err) {
				console.error({ err })
				const { data, reason, message, code, method, error } = err
				 let prettyMessage
        
				if (error?.message) {
          let key = error.message.replace('execution reverted: ', '')
          prettyMessage = errorMessages[key]
        }
        this.mintToast(
          'danger',
          prettyMessage ||
            error?.message ||
            data?.message ||
            reason ||
            message ||
            'Minting failed'
        )

			} finally {
				this.isBusy = false
			}
		},
	},
}
</script>
