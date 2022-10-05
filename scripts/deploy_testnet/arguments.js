const { default: MerkleTree } = require('merkletreejs');
const { utils } = require("ethers");
let addresses = require("./addresses");

require('dotenv').config({ path: __dirname + '/.env' })

/********************************* */
addresses = [
    ...addresses,
    "0x05db46B2588ebB55B4525b5d6103F41a776f9ec2",
    "0x49395fa317882f64d2373e3b36d8065ea7671cd3",
    "0x20f7d54fa1bb6a25047d9691d3ae93ac951c8a95",
    "0xCf83D441D8838acb8C4d77f7Dbc661aD9aAea7Da"
]
/********************************** */

const SELL_PRICE = utils.parseEther("0.15")

function hashData(account) {
    return Buffer.from(utils.solidityKeccak256(['address'], [account]).slice(2), 'hex')
}

function merkleTree(addresses) {
    let accounts = [];
    for (let j = 0; j < addresses.length; j++) {
        accounts.push(hashData(addresses[j]))
    }
    const merkleTree =  new MerkleTree(accounts, utils.keccak256, { sortPairs: true });
    return merkleTree;
}

const getProof = (merkleTree, account) => {
    return merkleTree.getHexProof(hashData(account));
}

module.exports = [
    SELL_PRICE,
    1664906400, //Starts Tuesday, October 4, 2022 1:00:00 PM GMT-05:00
    1665511200, //Ends Tuesday, October 11, 2022 1:00:00 PM GMT-05:00
    merkleTree(addresses).getHexRoot(),
    "TwinZ NFT Founders Pass",
    "TwinZFP",
    "https://twinznft.com/.netlify/functions/metadata/",
];



