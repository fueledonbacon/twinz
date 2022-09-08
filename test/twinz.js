const chai = require("chai");
const { expect } = require("chai");
const { utils } = require("ethers");
const { ethers, waffle } = require("hardhat");
const { default: MerkleTree } = require("merkletreejs");

const provider = waffle.provider;
const RECEIVER = "0x05db46B2588ebB55B4525b5d6103F41a776f9ec2";
const SELL_PRICE = toETH(0.5)

let merkleRoot;
let merkleSigners;

describe('TWINZ', function () {

  this.timeout(500000)

  let signers
  let twinz

  before(async function () {
    signers = await ethers.getSigners();

    merkleSigners = []
    for (let j = 1; j <= 10; j++) {
      let pos = j % 10;
      if (pos === 0) pos = 10
      merkleSigners.push(signers[pos])
    }
    merkleRoot = merkleTree(merkleSigners)

  });

  beforeEach(async function () {

    const Twinz = await ethers.getContractFactory("Twinz")
    twinz = await Twinz.deploy(SELL_PRICE, merkleRoot.getHexRoot(), "TWINZ_NFT", "TWINZ", "www.twinz.io/");
    await twinz.deployed()
  });

  it("Whitelist Mint", async function () {
    //tries to mint where sender is not whitelisted
    let merkleProof = getProof(merkleRoot, signers[0].address)
    await expect(
      twinz.whitelistMint(merkleProof, 1, { value: SELL_PRICE })
    ).to.be.revertedWith(`WHITELIST_NOT_VERIFIED`);

    //tries to mint with wrong sell price
    merkleProof = getProof(merkleRoot, signers[1].address)
    await expect(
      twinz.connect(signers[1]).whitelistMint(merkleProof, 1, { value: toETH(0.4) })
    ).to.be.revertedWith(`WRONG_PRICE`);

    //mints until max supply is reached
    await Promise.all(merkleSigners.map(async s => {
      const merkleProof = getProof(merkleRoot, s.address);
      const tx = await twinz.connect(s).whitelistMint(merkleProof, 10, { value: SELL_PRICE.mul(10) });
      await tx.wait()
    }))
    expect(await twinz.totalSupply()).to.be.equal(100)
    expect(await twinz.balanceOf(signers[1].address)).to.be.equal(10)
    expect(await twinz.balanceOf(signers[10].address)).to.be.equal(10)
    expect(await provider.getBalance(twinz.address)).to.be.equal(toETH(50))

    //tries to mint when max supply reached
    merkleProof = getProof(merkleRoot, signers[1].address)
    await expect(
      twinz.connect(signers[1]).whitelistMint(merkleProof, 1, { value: SELL_PRICE })
    ).to.be.revertedWith(`MAX_SUPPLY_REACHED`);

    //withdraws balance
    await twinz.withdrawBalance(RECEIVER);
    expect(await provider.getBalance(RECEIVER)).to.be.equal(toETH(50))
    expect(await provider.getBalance(twinz.address)).to.be.equal(0)
  })
})

function toETH(amount) {
  return utils.parseEther(amount.toString())
}

function merkleTree(signers) {
  let accounts = [];
  for (let j = 0; j < 10; j++) {
    accounts.push(hashData(signers[j].address))
  }
  return new MerkleTree(accounts, utils.keccak256, { sortPairs: true });
}

const getProof = (merkleTree, account) => {
  return merkleTree.getHexProof(hashData(account));
}

const hashData = (account) => {
  return Buffer.from(ethers.utils.solidityKeccak256(['address'], [account]).slice(2), 'hex')
}
