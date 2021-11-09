import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import Web3 from "web3"
import {
  nftaddress
} from '../config'


import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
// const url =  webersgeneratedimage




export default function nftcertificate() {


async function mintmyNFT(url) {


    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()



    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.mintNFT(nftaddress, url)
    let tx = await transaction.wait()
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()
    contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    transaction = await contract.giveOwnership(nftaddress , tokenId , {value : 10})
       await transaction.wait()
}



return (
 <div>
  <button onClick={mintmyNFT} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
        MINT YOUR NFT
      </button>
      </div>


)
}
