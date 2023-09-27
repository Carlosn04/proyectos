const { ethers } = require("hardhat");
const contract = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

async function main(){
    // const provider = new ethers.providers.JsonRpcProvider(network.provider)
    // const provider = new ethers.providers.Web3Provider(network.provider)
    const signer = await ethers.getSigner("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
    //console.log(signer)

    //console.log(hre.network.config)

    const contrato = await ethers.getContractAt("Contador", contract, signer);
    await contrato.reset()
    const result = await contrato.count()

    return console.log(result)
}

main()