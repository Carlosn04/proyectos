import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import './App.css'
import { GetAccount } from './hooks/getAccounts.jsx'
import { GetBalance } from './hooks/getBalance.jsx'
import { GetContador } from './hooks/getContador.jsx'
import { setTransaction } from './hooks/setTransaction'

function formatEther(weiValue) {
  if (!weiValue) return
  const etherValue = (BigInt(weiValue) / BigInt(10 ** 18)).toString();
  return `${etherValue} ETH`;
}

async function fetchDataAndSetState(account, setStateCallback) {
  const value = await GetContador(account);
  setStateCallback(value);
}

function App() {
  const account = GetAccount()
  const balance = formatEther(GetBalance(account))

  const { tx, useTx } = setTransaction()
  const [contador, setContadorValue] = useState(null);

  useEffect(() => {
    if (!account) return
    fetchDataAndSetState(account, setContadorValue)
  }, [account]);

  const handleIncrement = () => {
    useTx(1); // Call the useTransaction hook to increment
  };

  const handleDecrement = () => {
    useTx(-1); // Call the useTransaction hook to decrement
  };

  const tableCellStyle = {
    textAlign: "left", // Establece la alineación del contenido a la izquierda
  };

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td style={tableCellStyle}>Cuenta: </td>
            <td>{account}</td>
          </tr>
          <tr>
            <td style={tableCellStyle}>Balance: </td>
            <td>{balance}</td>
          </tr>
        </tbody>
      </table>
      <p>Contador: {contador !== null ? contador : 'Loading...'}</p>
      <pre style={tableCellStyle}>{tx}</pre>
      <button onClick={() => handleIncrement()}>Incrementar</button>
      <button onClick={() => handleDecrement()}>Decrementar</button>
    </div>
  );
}

export default App