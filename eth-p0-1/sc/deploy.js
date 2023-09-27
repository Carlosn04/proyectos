const {  ethers, JsonRpcProvider } = require('ethers');
const fs = require("fs");
// conexion al nodo desde nodejs
let httpProvider = new JsonRpcProvider("http://localhost:8545")
// lectura de los resultados de la compilacion
contractByteCode = fs.readFileSync('./out/contador_sol_Contador.bin').toString();
contractAbi = JSON.parse(fs.readFileSync('./out/contador_sol_Contador.abi').toString());
// wallet con una clave creada en el genesis
const jsonWallet = `{"address":"37fae9ead39b4b5ad53ef7982f6b4e6cec8d9d3a","crypto":{"cipher":"aes-128-ctr","ciphertext":"4b1e2bc5cf53962a6300a5fb1a71efb3fd1dd3f76b783f3140bdc0670ee393c3","cipherparams":{"iv":"cfc8bb9a61913982c01c3938af3f1555"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"a64f405c020a7bde3ae85ac60a7627fb0f16b1dbd3d9290a1e52f35a2b88d22b"},"mac":"368959fbf765420ede8878b810b8a88ecbe1849eb807b1529e4551d4682f9721"},"id":"d22d979a-e760-4c86-ba34-8ccb8d20e453","version":3}`


async function main() {
    // crear una wallet con la clave privada y la pwd
    let wallet = await ethers.Wallet.fromEncryptedJson(jsonWallet, "123456")
    wallet = wallet.connect(httpProvider)
    // crear el contrato
    const factory = await new ethers.ContractFactory(contractAbi, contractByteCode, wallet)
    // hacer el deploy
    let contract = await factory.deploy();  
    await contract.waitForDeployment()
    const addressContract = await contract.getAddress()
    fs.writeFileSync("./smartContractAddress.txt", addressContract)
    console.log(addressContract);    
}

main()