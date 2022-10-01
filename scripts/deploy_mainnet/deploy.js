const { ethers } = require('hardhat');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const updateOutput = require('../update_output.js');

const args = require("./arguments")
const path = "./scripts/deploy_mainnet/arguments.js";
const NETWORK = "mainnet"

async function main() {

  const Contract = await ethers.getContractFactory("Twinz");
  const contract = await Contract.deploy(...args)
  await contract.deployed();
  console.log("Twinz contract deployed to address:", contract.address)
  await updateOutput('./contracts/deployments.json', { mainnet: { address: contract.address, arguments: args } })

  console.log("Waiting for one minute for contract propagation")
  await new Promise(r => setTimeout(r, 60000));
  await verify(contract.address, path)
}

async function verify(address, path) {
  console.log("Start contract verification")
  try {
    const { stdout, stderr } = await exec(`npx hardhat verify ${address} --network ${NETWORK} --constructor-args ${path} `);
    if(stderr) return console.log('stderr:', stderr);
    console.log('stdout:', stdout);
  } catch (e) {
    console.error(e); // should contain code (exit code) and signal (that caused the termination).
  }
}
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
  