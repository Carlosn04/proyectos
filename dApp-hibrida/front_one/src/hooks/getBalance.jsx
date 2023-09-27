import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

const provider = new ethers.BrowserProvider(window.ethereum);

export function GetBalance(address) {
  const [balance, setBalance] = useState(null)

  async function useGetBalance() {
      if (!address) return
    const balance = await provider.getBalance(address)
    setBalance(balance.toString())
    console.log(balance)
  }


  useEffect(() => {
    useGetBalance()
  }, [address])
  
  return balance
}