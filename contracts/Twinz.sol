/*
Crafted with love by
Fueled on Bacon
https://fueledonbacon.com
*/
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./ERC721A.sol";


contract Twinz is ERC721A, Ownable {
    using Strings for uint256;

    uint256 private constant _MAX_SUPPLY = 100;
    
    uint256 public price;
    string private _baseUri;

    bytes32 private _whitelistMerkleRoot;

    constructor(
        uint256 price_,
        bytes32 whitelistMerkleRoot,
        string memory name,
        string memory symbol,
        string memory baseUri
    )
        ERC721A(name, symbol)
    {
        _whitelistMerkleRoot = whitelistMerkleRoot;
        _baseUri = baseUri;
        price = price_;
    }

    function setPrice(uint256 price_) external onlyOwner {
        price = price_;
    }

    function withdrawBalance(address payable to) external onlyOwner {
        to.transfer(address(this).balance);
    }

    function setMerkleRoot(bytes32 whitelistMerkleRoot) external onlyOwner {
        _whitelistMerkleRoot = whitelistMerkleRoot;
    }

    function setBaseURI(string memory baseUri) external onlyOwner {
        _baseUri = baseUri;
    }

    /// @dev override base uri. It will be combined with token ID
    function _baseURI() internal view override returns (string memory) {
        return _baseUri;
    }

    function _verifyWhitelist(bytes32[] calldata _merkleProof, address addr) private view returns(bool) {
       return (MerkleProof.verify(_merkleProof, _whitelistMerkleRoot, keccak256(abi.encodePacked(addr))) == true);
    }
    
    function whitelistMint(bytes32[] calldata _merkleProof, uint256 amount) external payable {
        require(msg.value == price*amount, "WRONG_PRICE");
        require(totalSupply() + amount <= _MAX_SUPPLY, "MAX_SUPPLY_REACHED");
        address account = _msgSender();
        require(_verifyWhitelist(_merkleProof, account), "WHITELIST_NOT_VERIFIED");
        _safeMint(account, amount);
    }


    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();

        string memory baseURI = _baseURI();
        return bytes(baseURI).length != 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json")) : '';
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721A) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    receive() external payable { }
}
