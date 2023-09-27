const fs = require("fs")
function generateGenesis(NETWORK_CHAINID, CUENTA, BALANCE, CUENTAS_ALLOC, NETWORK_DIR) {
    const timestamp = Math.round(((new Date()).getTime() / 1000)).toString(16)
    // leemos la plantilla del genesis
    let genesis = JSON.parse(fs.readFileSync('genesisbase.json').toString())

    // genesis.timestamp = `0x${timestamp}`
    genesis.config.chainId = NETWORK_CHAINID
    genesis.extraData = `0x${'0'.repeat(64)}${CUENTA}${'0'.repeat(130)}`


    genesis.alloc = CUENTAS_ALLOC.reduce((acc, item) => {
        acc[item] = { balance: BALANCE }
        return acc
    }, {})


    fs.writeFileSync(`${NETWORK_DIR}/genesis.json`, JSON.stringify(genesis))

}
const BALANCE = "0x200000000000000000000000000000000000000000000000000000000000000"
generateGenesis(3333,
    "37fae9ead39b4b5ad53ef7982f6b4e6cec8d9d3a", BALANCE,
    [
        "37fae9ead39b4b5ad53ef7982f6b4e6cec8d9d3a",
        "0xf6336be0205D2F03976878cc1c80E60C66C86C50",
        "0x6A8D2f0cc41745891981300f104FD0be8331832F",
        "0x80d244fF7D1A2B8482a59aFd592df1D2A162Bbfa"
    ], ".")