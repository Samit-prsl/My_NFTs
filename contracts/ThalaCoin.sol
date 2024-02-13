// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract ThalaCoin is ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Burnable {
    uint256 private _nextTokenId;
    uint256 private MAX_MINT = 1000;

    constructor()
        ERC721("ThalaCoin", "TH7")
    {}

    struct User {
        uint256 _Count;
    }

    mapping (address => User[]) public user;

    modifier RestrictionForMaxMinting()  {
        require(MAX_MINT >= 1000,"You cannot mint more NFTs!");
        _;
    }

    function safeMint(address to, string memory uri) public RestrictionForMaxMinting {
        uint256 tokenId = _nextTokenId++;
        User memory _user = User({
            _Count : tokenId
        });
        user[to].push(_user);
        require(user[to][user[to].length-1]._Count <=1,"Max Minting limit exceeded from this address!");
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}