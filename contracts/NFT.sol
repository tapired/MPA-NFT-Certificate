//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFT is ERC721URIStorage , ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event TransferSuccessfull(
  uint256 indexed tokenId,
  address owner
);
    constructor() public ERC721("MinorityNFT", "MPANFT") {}

    function mintNFT(address recipient, string memory tokenURI)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

    function giveOwnership(address nftaddress , uint tokenId) public payable nonReentrant  {
      uint listprice = msg.value ;
      IERC721(nftaddress).transferFrom(address(this), msg.sender, tokenId);
      payable(msg.sender).transfer(listprice);
      emit TransferSuccessfull(
        tokenId,
        msg.sender
        );
    }


}
