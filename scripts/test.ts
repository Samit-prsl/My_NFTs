import dotenv from "dotenv"
dotenv.config()
import { createAlchemyWeb3 } from "@alch/alchemy-web3"
const web3 = createAlchemyWeb3(process.env.ALCHEMY_URI!)

import contract from '../artifacts/contracts/ThalaCoin.sol/ThalaCoin.json'

const contractAddress = "0x87015A78Dc259BaaCAD30c842604E59fC36874e8"
const NFT = new web3.eth.Contract(contract.abi as any,contractAddress)

console.log(NFT.methods.tokenURI(1))