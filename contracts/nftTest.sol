// SPDX-License-Identifier:MIT
pragma solidity ^0.8.20;

// import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
// import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract nftTest is ERC721URIStorage, Ownable {

    uint256 private _tokenId;
    constructor() ERC721("Thalacoin","TH7") Ownable(msg.sender){}
        function mintNft(address recipient,string memory tokenURI) public onlyOwner  returns (uint256) {
            _tokenId++;
            uint256 _newTokenId = _tokenId;
            _mint(recipient,_newTokenId);
            _setTokenURI(_newTokenId,tokenURI);
            return _newTokenId;
   }
}