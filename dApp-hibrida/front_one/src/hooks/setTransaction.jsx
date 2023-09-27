import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

const ABI = `
[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},
 {"inputs":[],"name":"contador","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dec","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"inc","outputs":[],"stateMutability":"nonpayable","type":"function"}]
`
const SC = "0xB1F924736986f50371105E71D3d5dB5993E06EcB"

export function setTransaction() {
    const [tx, setTx] = useState(null)
    const [contador, setContador] = useState(null)

    async function useTx(valor) {
        if (!valor) return
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(SC, ABI, signer);
        const tx = valor === 1 ? await contract.inc() : await contract.dec()
        const receipt = await tx.wait();
        console.log(tx)
        setTx(JSON.stringify({ tx, receipt }, null, 4))
        const c = await contract.contador()
        setContador(c.toString())
    }
    return { tx, contador, useTx }
}