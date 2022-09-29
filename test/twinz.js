const chai = require("chai");
const { expect } = require("chai");
const { utils } = require("ethers");
const { ethers, waffle } = require("hardhat");
const { default: MerkleTree } = require("merkletreejs");
const { getLatestTimestamp, timeIncreaseTo } = require("../scripts/time");

const provider = waffle.provider;
const RECEIVER = "0x05db46B2588ebB55B4525b5d6103F41a776f9ec2";
const SELL_PRICE = toETH(0.45)

let merkleRoot;
let merkleSigners;

describe('TWINZ', function () {

  this.timeout(500000)

  let signers
  let twinz

  before(async function () {
    signers = await ethers.getSigners();
    merkleSigners = []
    for (let j = 1; j <= 100; j++) {
      let pos = j % 100;
      if (pos === 0) pos = 100
      merkleSigners.push(signers[pos])
    }
    merkleRoot = merkleTree(merkleSigners)

  });

  beforeEach(async function () {

    const Twinz = await ethers.getContractFactory("Twinz")
    twinz = await Twinz.deploy(SELL_PRICE, merkleRoot.getHexRoot(), "TWINZ_NFT", "TWINZ", "www.twinz.io/", RECEIVER);
    await twinz.deployed()
  });


  // it("Whitelist Mint", async function () {

  //   //tries to mint where sale not yet active
  //   let merkleProof = getProof(merkleRoot, signers[0].address)
  //   await expect(
  //     twinz.whitelistMint(merkleProof, { value: SELL_PRICE })
  //   ).to.be.revertedWith(`SALE_NOT_ACTIVE`);

  //   let latestTimestamp = (await getLatestTimestamp()).toNumber();
  //   await twinz.setStartTime(latestTimestamp + 60); //starts in 60 secs
  //   await twinz.setEndTime(latestTimestamp + 5*60); //ends in 5 mins
  //   await expect(
  //     twinz.whitelistMint(merkleProof, { value: SELL_PRICE })
  //   ).to.be.revertedWith(`SALE_NOT_ACTIVE`);

  //   await timeIncreaseTo(latestTimestamp + 70);

  //   //tries to mint where sender is not whitelisted
  //   merkleProof = getProof(merkleRoot, signers[0].address)
  //   await expect(
  //     twinz.whitelistMint(merkleProof, { value: SELL_PRICE })
  //   ).to.be.revertedWith(`WHITELIST_NOT_VERIFIED`);

  //   //tries to mint with wrong sell price
  //   merkleProof = getProof(merkleRoot, signers[1].address)
  //   await expect(
  //     twinz.connect(signers[1]).whitelistMint(merkleProof, { value: toETH(0.4) })
  //   ).to.be.revertedWith(`WRONG_PRICE`);

  //   //mints until max whitelist limit is reached
  //   await Promise.all(merkleSigners.map(async (s, i) => {
  //     const merkleProof = getProof(merkleRoot, s.address);
  //     if(i < 98) {
  //       const tx = await twinz.connect(s).whitelistMint(merkleProof, { value: SELL_PRICE });
  //       await tx.wait()
  //     }
  //   }))

  //   expect(await twinz.totalSupply()).to.be.equal(99)
  //   expect(await twinz.balanceOf(signers[1].address)).to.be.equal(1)
  //   expect(await twinz.balanceOf(signers[98].address)).to.be.equal(1)
  //   expect(await provider.getBalance(twinz.address)).to.be.equal(SELL_PRICE.mul(98))

  //   // //tries to mint where whitelist finished
  //   await twinz.toggleWhitelist()
  //   merkleProof = getProof(merkleRoot, signers[100].address)
  //   await expect(
  //     twinz.connect(signers[100]).whitelistMint(merkleProof, { value: SELL_PRICE })
  //   ).to.be.revertedWith(`WHITELIST_FINISHED`);


  //    await twinz.toggleWhitelist()
  //    merkleProof = getProof(merkleRoot, signers[99].address)
  //    await twinz.connect(signers[99]).whitelistMint(merkleProof, { value: SELL_PRICE });

  //    //tries to mint when max mint reached
  //   merkleProof = getProof(merkleRoot, signers[100].address)
  //   await expect(
  //     twinz.connect(signers[100]).whitelistMint(merkleProof, { value: SELL_PRICE })
  //   ).to.be.revertedWith(`MAX_SUPPLY_REACHED`);

  //   //withdraws balance
  //   const beforeBalance = await provider.getBalance(RECEIVER)
  //   await twinz.withdrawBalance(RECEIVER);
  //   expect(await provider.getBalance(RECEIVER)).to.be.equal(beforeBalance.add(SELL_PRICE.mul(99)))
  //   expect(await provider.getBalance(twinz.address)).to.be.equal(0)
  // })

  // it("Checks time start and time end", async function() {
  //   let latestTimestamp = (await getLatestTimestamp()).toNumber();
  //   await twinz.setStartTime(latestTimestamp + 60); //starts in 60 secs
  //   await twinz.setEndTime(latestTimestamp + 5*60); //ends in 5 mins

  //   await timeIncreaseTo(latestTimestamp + 70);

  //   let merkleProof = getProof(merkleRoot, signers[99].address)
  //   await twinz.connect(signers[99]).whitelistMint(merkleProof, { value: SELL_PRICE });

  //   //time end over
  //   await timeIncreaseTo(latestTimestamp + 5*60+20);
  //   //tries to mint when end time finished
  //   merkleProof = getProof(merkleRoot, signers[100].address)
  //   await expect(
  //     twinz.connect(signers[100]).whitelistMint(merkleProof, { value: SELL_PRICE })
  //   ).to.be.revertedWith(`SALE_NOT_ACTIVE`);

  //   //overrides saleActive
  //   await twinz.toggleSalePeriodOverride();

  //   await twinz.connect(signers[100]).whitelistMint(merkleProof, { value: SELL_PRICE })

  //   //tries to public mint
  //   await expect(
  //     twinz.connect(signers[150]).publicMint({ value: SELL_PRICE })
  //   ).to.be.revertedWith(`WHITELIST_NOT_YET_FINISHED`);

  //   //finishes whitelist sale
  //   await twinz.toggleWhitelist();
  //   await twinz.connect(signers[150]).publicMint({ value: SELL_PRICE })
  // })

  it("Public Mint", async function () {

    let latestTimestamp = (await getLatestTimestamp()).toNumber();
    await twinz.setStartTime(latestTimestamp + 60); //starts in 60 secs
    await twinz.setEndTime(latestTimestamp + 5*60); //ends in 5 mins

    await timeIncreaseTo(latestTimestamp + 70);

    //Whitelist mint 50
    await Promise.all(merkleSigners.map(async (s, i) => {
      const merkleProof = getProof(merkleRoot, s.address);
      if(i < 50) {
        const tx = await twinz.connect(s).whitelistMint(merkleProof, { value: SELL_PRICE });
        await tx.wait()
      }
    }))

    expect(await twinz.totalSupply()).to.be.equal(51)
    expect(await twinz.balanceOf(signers[1].address)).to.be.equal(1)
    expect(await twinz.balanceOf(signers[50].address)).to.be.equal(1)
    expect(await provider.getBalance(twinz.address)).to.be.equal(SELL_PRICE.mul(50))

    //tries to mint where whitelist not yet finishd
    await expect(
      twinz.connect(signers[91]).publicMint({ value: SELL_PRICE })
    ).to.be.revertedWith(`WHITELIST_NOT_YET_FINISHED`);

    // toggle to public mint
    await timeIncreaseTo(latestTimestamp + 5*60+20);
    await twinz.toggleWhitelist()

    //tries to mint when public sale ended
    await expect(
      twinz.connect(signers[100]).publicMint({ value: SELL_PRICE })
    ).to.be.revertedWith(`SALE_NOT_ACTIVE`);

    await twinz.toggleSalePeriodOverride()
    
    //tries to mint with wrong sell price
    await expect(
      twinz.connect(signers[100]).publicMint({ value: toETH(0.4) })
    ).to.be.revertedWith(`WRONG_PRICE`);

    //tries to mint again
    await expect(
      twinz.connect(signers[1]).publicMint({ value: SELL_PRICE })
    ).to.be.revertedWith(`ALREADY_MINTED`);

    //mints 50 left on public mint
    Promise.all(new Array(49).fill(0).map(async (a, i) => {
      await twinz.connect(signers[100 + i]).publicMint({ value: SELL_PRICE })
    }))

    //tries to mint more than max supply
    await expect(
      twinz.connect(signers[200]).publicMint({ value: SELL_PRICE })
    ).to.be.revertedWith(`MAX_SUPPLY_REACHED`);

    expect(await twinz.totalSupply()).to.be.equal(100)
    expect(await twinz.balanceOf(signers[1].address)).to.be.equal(1)
    expect(await twinz.balanceOf(signers[148].address)).to.be.equal(1)
    expect(await provider.getBalance(twinz.address)).to.be.equal(SELL_PRICE.mul(99))

    //withdraws balance
    const beforeBalance = await provider.getBalance(RECEIVER)
    await twinz.withdrawBalance(RECEIVER);
    expect(await provider.getBalance(RECEIVER)).to.be.equal(beforeBalance.add(SELL_PRICE.mul(99)))
    expect(await provider.getBalance(twinz.address)).to.be.equal(0)
  })
})

function toETH(amount) {
  return utils.parseEther(amount.toString())
}

function merkleTree(signers) {
  let accounts = [];
  for (let j = 0; j < signers.length; j++) {
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
