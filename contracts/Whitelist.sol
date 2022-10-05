/*
Crafted with love by
Fueled on Bacon
https://fueledonbacon.com
*/
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Whitelist is Ownable {
    bytes32 public whitelistMerkleRoot;

    constructor(bytes32 _whitelistMerkleRoot)
    {
        whitelistMerkleRoot = _whitelistMerkleRoot;
    }

    function setMerkleRoot(bytes32 _whitelistMerkleRoot) external onlyOwner {
        whitelistMerkleRoot = _whitelistMerkleRoot;
    }

    function verifyWhitelist(bytes32[] calldata _merkleProof, address addr) public view returns(bool) {
       return (MerkleProof.verify(_merkleProof, whitelistMerkleRoot, keccak256(abi.encodePacked(addr))) == true);
    }
    
}
