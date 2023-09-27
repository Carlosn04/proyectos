const { ethers, JsonRpcProvider, Wallet } = require('ethers');
const fs = require("fs");
// conexion al nodo desde nodejs
const httpProvider = new JsonRpcProvider("http://127.0.0.1:8545")
// lectura de los resultados de la compilacion
const contractByteCode = fs.readFileSync('./out/contador_sol_Contador.bin').toString();
const contractAbi = JSON.parse(fs.readFileSync('./out/contador_sol_Contador.abi').toString());
// wallet con una clave creada en el genesis
const jsonWallet = `{"address":"f6336be0205d2f03976878cc1c80e60c66c86c50","id":"b6c829ae-cfa8-4f27-9ab1-219765e49092","version":3,"Crypto":{"cipher":"aes-128-ctr","cipherparams":{"iv":"9edf43324f6cc51bf5aaabd597f3af16"},"ciphertext":"add46f3287d4250e278d14f9ec35d40a71d4816d497487f8a03db690dfafa1fe","kdf":"scrypt","kdfparams":{"salt":"1bfdc34fb8dd80b7dbc321a58f0dd4819a52bf75ad6a85f3ce0f539807502b2b","n":131072,"dklen":32,"p":1,"r":8},"mac":"e8f906566e6518eb821351be3515421f3c7ef3bc8feabf58719960c94d5e59f6"}}`

async function main(provider, account) {
    // crear una wallet con la clave privada y la pwd

    //const provider = new ethers.BrowserProvider(window.ethereum)
    const wallet = await provider.getSigner(account)
    // crear el contrato
    const factory = new ethers.ContractFactory(contractAbi, contractByteCode, wallet)
    //return console.log(await httpProvider.getNetwork())
    const gasLimit = 200000; // Replace with your desired gas limit
    // Deploy the contract with the specified gas limit
    let contract = await factory.deploy({ gasLimit: gasLimit });
    await contract.waitForDeployment()
    const addressContract = await contract.getAddress()
    fs.writeFileSync("./smartContractAddress.txt", addressContract)
    console.log(addressContract);
}

export default main()