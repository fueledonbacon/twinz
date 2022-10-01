const { default: MerkleTree } = require('merkletreejs');
const { utils } = require("ethers");
let addresses = require("./addresses");


require('dotenv').config({ path: __dirname + '/.env' })

/********************************* */
//TODO: remove for mainnet launch
addresses = [
    ...addresses,
    "0x05db46B2588ebB55B4525b5d6103F41a776f9ec2",
    "0x49395fa317882f64d2373e3b36d8065ea7671cd3",
    "0x20f7d54fa1bb6a25047d9691d3ae93ac951c8a95"
]
/********************************** */

const SELL_PRICE = utils.parseEther("0.5")

function merkleTree(addresses) {
    let accounts = [];
    for (let j = 0; j < addresses.length; j++) {
        accounts.push(hashData(addresses[j]))
    }
    const merkleTree =  new MerkleTree(accounts, utils.keccak256, { sortPairs: true });
    console.log(JSON.stringify(getProof(merkleTree, "0x05db46B2588ebB55B4525b5d6103F41a776f9ec2")).replace(/"/g, ''))
    return merkleTree;
}

const getProof = (merkleTree, account) => {
    return merkleTree.getHexProof(hashData(account));
}

function hashData(account) {
    return Buffer.from(utils.solidityKeccak256(['address'], [account]).slice(2), 'hex')
}

module.exports = [
    SELL_PRICE,
    merkleTree(addresses).getHexRoot(),
    "TWINZ_NFT",
    "TWINZ",
    "https://drive.google.com/file/d/16jomnURJNv2Wv67L5BwfjAzsprKeL-F4/view/",
    "0x05db46B2588ebB55B4525b5d6103F41a776f9ec2"
];



