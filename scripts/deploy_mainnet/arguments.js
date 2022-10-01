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
    "https://drive.google.com/file/d/16jomnURJNv2Wv67L5BwfjAzsprKeL-F4/view/",
    "0x0decb04d7f0685d196beb845a62356ff2c4098fd"
];



