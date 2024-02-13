import dotenv from "dotenv"
dotenv.config()
import { createAlchemyWeb3 } from "@alch/alchemy-web3"
const web3 = createAlchemyWeb3(process.env.ALCHEMY_URI!)

import contract from '../artifacts/contracts/ThalaCoin.sol/ThalaCoin.json'

const contractAddress = "0x87015A78Dc259BaaCAD30c842604E59fC36874e8"
const NFT = new web3.eth.Contract(contract.abi as any,contractAddress)

async function mintNFT(tokenURI:any) {
    const nonce = await web3.eth.getTransactionCount(process.env.METAMASK_PUBLIC_KEY!,"latest")
    const tx = {
        'from' : process.env.METAMASK_PUBLIC_KEY,
        'to' : contractAddress,
        'nonce' : nonce,
        'gas' : '500000',
        'data' : NFT.methods.safeMint(process.env.METAMASK_PUBLIC_KEY,tokenURI).encodeABI()
    }
    const signPromise = web3.eth.accounts.signTransaction(tx, process.env.METAMASK_PRIVATE_KEY!);
    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction!,
          function (err, hash) {
            if (!err) {
              console.log(
                "The hash of your transaction is: ",
                hash,
              );
            } else {
              console.log(
                "Something went wrong when submitting your transaction:",
                err
              );
            }
          }
        );
      })
      .catch((err) => {
        console.log(" Promise failed:", err);
      });
}

mintNFT("https://amethyst-absent-whale-734.mypinata.cloud/ipfs/QmQZjpxKRd4axdDvUcfWxi3pjEvhWH8Edmu6WD3uxDBx35")