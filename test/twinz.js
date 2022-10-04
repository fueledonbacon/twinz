const chai = require("chai");
const { expect } = require("chai");
const { utils } = require("ethers");
const { ethers, waffle } = require("hardhat");
const { default: MerkleTree } = require("merkletreejs");
const { getLatestTimestamp, timeIncreaseTo } = require("../scripts/time");

const provider = waffle.provider;
const RECEIVER = "0x05db46B2588ebB55B4525b5d6103F41a776f9ec2";
const SELL_PRICE = toETH(0.15)

let merkleRoot;
let merkleSigners;

describe('TWINZ', function () {

  this.timeout(500000)

  let signers
  let twinz

  before(async function () {
    signers = await ethers.getSigners();
    merkleSigners = []
    for (let j = 1; j <= 101; j++) {
      let pos = j % 101;
      if (pos === 0) pos = 101
      merkleSigners.push(signers[pos])
    }
    merkleRoot = merkleTree(merkleSigners)

  });

  beforeEach(async function () {

    const latestTimestamp = (await getLatestTimestamp()).toNumber();
    const startTime = latestTimestamp + 60; //starts in 60 secs
    const endTime = latestTimestamp + 5*60; //ends in 5 mins

    const Twinz = await ethers.getContractFactory("Twinz")
    twinz = await Twinz.deploy(SELL_PRICE, startTime, endTime, merkleRoot.getHexRoot(), "TWINZ_NFT", "TWINZ", "www.twinz.io/");
    await twinz.deployed()
  });


  it("Whitelist Mint", async function () {

    //tries to mint where sale not yet active
    let merkleProof = getProof(merkleRoot, signers[0].address)
    await expect(
      twinz.whitelistMint(merkleProof, { value: SELL_PRICE })
    ).to.be.revertedWith(`SALE_NOT_ACTIVE`);

    await expect(
      twinz.whitelistMint(merkleProof, { value: SELL_PRICE })
    ).to.be.revertedWith(`SALE_NOT_ACTIVE`);

    let latestTimestamp = (await getLatestTimestamp()).toNumber();
    await timeIncreaseTo(latestTimestamp + 70);

    //tries to mint where sender is not whitelisted
    merkleProof = getProof(merkleRoot, signers[0].address)
    await expect(
      twinz.whitelistMint(merkleProof, { value: SELL_PRICE })
    ).to.be.revertedWith(`WHITELIST_NOT_VERIFIED`);

    //tries to mint with wrong sell price
    merkleProof = getProof(merkleRoot, signers[1].address)
    await expect(
      twinz.connect(signers[1]).whitelistMint(merkleProof, { value: toETH(0.4) })
    ).to.be.revertedWith(`WRONG_PRICE`);

    //mints until max whitelist limit is reached
    await Promise.all(merkleSigners.map(async (s, i) => {
      const merkleProof = getProof(merkleRoot, s.address);
      if(i < 99) {
        const tx = await twinz.connect(s).whitelistMint(merkleProof, { value: SELL_PRICE });
        await tx.wait()
      }
    }))

    expect(await twinz.totalSupply()).to.be.equal(99)
    expect(await twinz.balanceOf(signers[1].address)).to.be.equal(1)
    expect(await twinz.balanceOf(signers[99].address)).to.be.equal(1)
    expect(await provider.getBalance(twinz.address)).to.be.equal(SELL_PRICE.mul(99))

    // //tries to mint where whitelist finished
    await twinz.toggleWhitelist()
    merkleProof = getProof(merkleRoot, signers[100].address)
    await expect(
      twinz.connect(signers[100]).whitelistMint(merkleProof, { value: SELL_PRICE })
    ).to.be.revertedWith(`WHITELIST_FINISHED`);


     await twinz.toggleWhitelist()
     merkleProof = getProof(merkleRoot, signers[100].address)
     await twinz.connect(signers[100]).whitelistMint(merkleProof, { value: SELL_PRICE });

     //tries to mint when max mint reached
    merkleProof = getProof(merkleRoot, signers[101].address)
    await expect(
      twinz.connect(signers[101]).whitelistMint(merkleProof, { value: SELL_PRICE })
    ).to.be.revertedWith(`MAX_SUPPLY_REACHED`);

    //withdraws balance
    const beforeBalance = await provider.getBalance(RECEIVER)
    await twinz.withdrawBalance(RECEIVER);
    expect(await provider.getBalance(RECEIVER)).to.be.equal(beforeBalance.add(SELL_PRICE.mul(100)))
    expect(await provider.getBalance(twinz.address)).to.be.equal(0)
  })

  it("Checks time start and time end", async function() {
    let latestTimestamp = (await getLatestTimestamp()).toNumber();
    await timeIncreaseTo(latestTimestamp + 70);

    let merkleProof = getProof(merkleRoot, signers[99].address)
    await twinz.connect(signers[99]).whitelistMint(merkleProof, { value: SELL_PRICE });

    //time end over
    await timeIncreaseTo(latestTimestamp + 5*60+20);
    //tries to mint when end time finished
    merkleProof = getProof(merkleRoot, signers[100].address)
    await expect(
      twinz.connect(signers[100]).whitelistMint(merkleProof, { value: SELL_PRICE })
    ).to.be.revertedWith(`SALE_NOT_ACTIVE`);

    //overrides saleActive
    await twinz.toggleSalePeriodOverride();

    await twinz.connect(signers[100]).whitelistMint(merkleProof, { value: SELL_PRICE })

    //tries to public mint
    await expect(
      twinz.connect(signers[150]).publicMint({ value: SELL_PRICE })
    ).to.be.revertedWith(`WHITELIST_NOT_YET_FINISHED`);

    //finishes whitelist sale
    await twinz.toggleWhitelist();
    await twinz.connect(signers[150]).publicMint({ value: SELL_PRICE })
  })

  it("Public Mint With Airdop", async function () {

    const airdropAddresses = []
    for(let j = 200; j < 210; j++) {
      airdropAddresses.push(signers[j].address)
    }

    await twinz.airdrop(airdropAddresses);

    expect(await twinz.totalSupply()).to.be.equal(10)

    let latestTimestamp = (await getLatestTimestamp()).toNumber();
    await timeIncreaseTo(latestTimestamp + 70);

    //Whitelist mint 50
    await Promise.all(merkleSigners.map(async (s, i) => {
      const merkleProof = getProof(merkleRoot, s.address);
      if(i < 50) {
        const tx = await twinz.connect(s).whitelistMint(merkleProof, { value: SELL_PRICE });
        await tx.wait()
      }
    }))

    expect(await twinz.totalSupply()).to.be.equal(60)
    expect(await twinz.balanceOf(signers[1].address)).to.be.equal(1)
    expect(await twinz.balanceOf(signers[50].address)).to.be.equal(1)
    expect(await provider.getBalance(twinz.address)).to.be.equal(SELL_PRICE.mul(50))

    //tries to mint where whitelist not yet finishd
    await expect(
      twinz.connect(signers[91]).publicMint({ value: SELL_PRICE })
    ).to.be.revertedWith(`WHITELIST_NOT_YET_FINISHED`);

    await twinz.toggleWhitelist()

    const mintPublic = new Array(20).fill(0);
    await Promise.all(mintPublic.map(async (a, i) => {
      await twinz.connect(signers[300+i]).publicMint({ value: SELL_PRICE})
    }))

    expect(await twinz.totalSupply()).to.be.equal(80)

    await timeIncreaseTo(latestTimestamp + 5*60+20);
    //tries to mint when public sale ended
    await expect(
      twinz.connect(signers[100]).publicMint({ value: SELL_PRICE })
    ).to.be.revertedWith(`SALE_NOT_ACTIVE`);

    // toggle to public mint
    await twinz.toggleSalePeriodOverride()
    
    //tries to mint with wrong sell price
    await expect(
      twinz.connect(signers[100]).publicMint({ value: toETH(0.4) })
    ).to.be.revertedWith(`WRONG_PRICE`);

    //tries to mint again
    await expect(
      twinz.connect(signers[1]).publicMint({ value: SELL_PRICE })
    ).to.be.revertedWith(`ALREADY_MINTED`);

    //mints 20 left on public mint
    Promise.all(new Array(20).fill(0).map(async (a, i) => {
      await twinz.connect(signers[400 + i]).publicMint({ value: SELL_PRICE })
    }))

    //tries to mint more than max supply
    await expect(
      twinz.connect(signers[200]).publicMint({ value: SELL_PRICE })
    ).to.be.revertedWith(`MAX_SUPPLY_REACHED`);

    //tries to airdop again
    await expect(
      twinz.airdrop([signers[500].address])
    ).to.be.revertedWith(`MAX_SUPPLY_REACHED`);


    expect(await twinz.totalSupply()).to.be.equal(100)
    expect(await twinz.balanceOf(signers[1].address)).to.be.equal(1)
    expect(await twinz.balanceOf(signers[401].address)).to.be.equal(1)
    expect(await provider.getBalance(twinz.address)).to.be.equal(SELL_PRICE.mul(90))

    //withdraws balance
    const beforeBalance = await provider.getBalance(RECEIVER)
    await twinz.withdrawBalance(RECEIVER);
    expect(await provider.getBalance(RECEIVER)).to.be.equal(beforeBalance.add(SELL_PRICE.mul(90)))
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
