import { MerkleTree } from "merkletreejs";
import { ethers } from 'ethers';

const generateProof =  async (address, list) => {
    const leaves = list.map(x => ethers.utils.keccak256(x))
    const tree = new MerkleTree(leaves, ethers.utils.keccak256 , { sortPairs: true });
    console.debug(tree.getHexRoot());
    const leaf = await ethers.utils.keccak256(address)

    return tree.getHexProof(leaf)
}
  
export { generateProof }