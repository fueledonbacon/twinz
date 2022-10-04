const { default: MerkleTree } = require('merkletreejs');
const { utils } = require("ethers");
const addresses = require("./addresses");

require('dotenv').config({ path: __dirname + '/.env' })

const SELL_PRICE = utils.parseEther("0.15")

function merkleTree(addresses) {
    let accounts = [];
    for (let j = 0; j < addresses.length; j++) {
        accounts.push(hashData(addresses[j]))
    }
    const merkleTree =  new MerkleTree(accounts, utils.keccak256, { sortPairs: true });
    return merkleTree;
}

function hashData(account) {
    return Buffer.from(utils.solidityKeccak256(['address'], [account]).slice(2), 'hex')
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



