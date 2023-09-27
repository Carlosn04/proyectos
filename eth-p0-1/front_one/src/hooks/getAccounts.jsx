import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

const provider = new ethers.BrowserProvider(window.ethereum);

export function GetAccount() {
  const [address, setAddress] = useState(null)

  async function setUse() {
    const cuentas = await ethereum.request({ method: "eth_requestAccounts" })
    setAddress(cuentas[0])
    window.ethereum.on("accountsChanged", addresses => {
      setAddress(addresses[0])
    })
  }

  useEffect(() => {
    setUse()
  }, [])
  return address
}