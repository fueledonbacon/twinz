const { default: MerkleTree } = require('merkletreejs');
const { utils } = require("ethers");
const addresses = require("./addresses");


require('dotenv').config({ path: __dirname + '/.env' })

const SELL_PRICE = utils.parseEther("0.45")

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

function hashData(account) {
    return Buffer.from(utils.solidityKeccak256(['address'], [account]).slice(2), 'hex')
}

module.exports = [
    SELL_PRICE,
    merkleTree(addresses).getHexRoot(),
    "TwinZ NFT Founders Pass",
    "TwinZFP",
    "https://deploy-preview-23--velvety-strudel-4156e3.netlify.app/.netlify/functions/metadata/",
    "0x0decb04d7f0685d196beb845a62356ff2c4098fd",
    1664658000, // 2022-09-01 17:00:00 EST
    1665176400, // 2022-09-07 17:00:00 EST
];



