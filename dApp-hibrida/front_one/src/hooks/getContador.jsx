import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

const ABI = `
[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},
 {"inputs":[],"name":"contador","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dec","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"inc","outputs":[],"stateMutability":"nonpayable","type":"function"}]
`
const SC = "0xB1F924736986f50371105E71D3d5dB5993E06EcB"
let httpProvider = new ethers.JsonRpcProvider("http://localhost:8545")

export function GetContador(address) {
  const [contador, setContador] = useState(null)
  
  async function useGetContador() {
    if (!address) return
    const contract = new ethers.Contract(SC, ABI, httpProvider);
    const num = await contract.contador()
    setContador(num.toString());
    console.log("Contador: ", num.toString())
  }

  useEffect(() => {
    useGetContador()
  }, [address])
  
  return contador
}