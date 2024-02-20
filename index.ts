import axios from "axios"
import FormData from 'form-data'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const JWT = process.env.PINATA_JWT

async function main() {
  try{
  const formData = new FormData();
  
  const file = fs.readFileSync('nftpic.png')
  formData.append('file', file)
  
  const pinataMetadata = JSON.stringify({
    name: 'File name',
  });
  formData.append('pinataMetadata', pinataMetadata);
  
  const pinataOptions = JSON.stringify({
    cidVersion: 1,
  })
  formData.append('pinataOptions', pinataOptions);

    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      headers: {
        Authorization: `Bearer ${JWT}`,
        "Content-Type":"multipart/form-data"
      }
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}

main()
