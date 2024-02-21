import {exec} from 'child_process'
import express from 'express'

const app  = express()
const PORT = 3000

function runCommand() : void {
  exec('npx hardhat run --network sepolia scripts/deploy.ts',(error, stdout, stderr)=>{
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  })
}

app.get('/',(req,res):void=>{
  res.send('<button onclick="runCommand()">Run Command</button>')
})

app.listen(PORT,()=>{
  console.log(`server listening at ${PORT}`);
})

//runCommand()