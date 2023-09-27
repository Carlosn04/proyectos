import { useEffect,  useState } from 'react'
import { ethers } from "ethers";
import abi from "./contracts/myToken.json"

const provider = new ethers.BrowserProvider(window.ethereum)

function App() {
  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState(null)
  const [contract, setContract] = useState(null)
  const [tokens, setTokens] = useState(null)

  useEffect(() => {
    //activate()
    checkAccount()
  }, [])

  useEffect(() => {
    getBalance()
  }, [account])

  useEffect(() => {
    contrato()
  }, [account])

  useEffect(() => {
    getTokens()
  }, [contract, account])
  
  // invoke to connect to wallet account
  async function activate() {
    if (window.ethereum) {
      try {
        checkAccount()
        
      } catch (err) {
        console.log('user did not add account...', err)
      }
    }
  }
  
  // invoke to check if account is already connected
  async function checkAccount() {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
    window.ethereum.on("accountsChanged", (accounts) => {
      setAccount(accounts[0])
    })

    setAccount(accounts[0])
  }

  async function getBalance() {
    const balance = await provider.getBalance(account)
    setBalance(balance.toString())
    console.log(balance)
  }

  async function contrato() {
    const sc = "0x61755BaF9F172BdCC7339986999262aB3d244D41";
    const signer = await provider.getSigner(account)
    const contrato = new ethers.Contract(sc, abi.abi, signer)
    setContract(contrato)
  }

  async function getTokens() {
    if (!contract) return 
    const balance = await contract.balanceOf(account)
    setTokens(balance.toString())
  }

  async function handleSubmit(e){
    e.preventDefault()
    const [address, amount] = e.target
    const tx = await contract.transfer(address.value, amount.value)
    await tx.wait()
    console.log("transfered")
  }

  return (
    <div>
      <p>Cuenta: {account}</p>
      <p>Balance: {balance}</p>
      <p>Tokens: {tokens}</p>
      <form onSubmit={(e) => {handleSubmit(e)}}>
        <input type="text" name="address" placeholder="address"/>
        <input type="text" amount="amount" placeholder="amount"/>
        <button type="Submit">Send</button>
      </form>
    </div>
  );
}

export default App;