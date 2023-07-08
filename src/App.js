import './App.css';
import { useState, useEffect } from 'react';
import useDisplayToggle from './hooks/useDisplayToggle';
import Modal from './components/Modal/modal';
import Table from './components/Table/table';

const SERVER_URL =" http://localhost:3003";

function App() {
  const { isVisable, turnOnVisibility, turnOffVisibility} = useDisplayToggle(false)
  const [transactions, setTransactions] = useState([])

  const [tradingParty, setTradingParty] = useState("me")
  const [counterTradingParty, setCounterTradingParty] = useState("")
  const [amount, setAmount] = useState(0)


  useEffect(()=>{
    fetch(`${SERVER_URL}/transactions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res)=>
      res.json().then((res1)=>{
        setTransactions(res1)
        console.log(res1)
      })
    ).catch(error => {
      console.error(error);
    });
  }, [])

  const compress = () => {
    fetch(`${SERVER_URL}/compress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res)=>
      res.json().then((res1)=>{
        setTransactions(res1)
      })
   ).catch(error => {
    console.error(error);
  });;
  }

  const submitTransaction = () => {
    setTradingParty(tradingParty.trim())
    setCounterTradingParty(counterTradingParty.trim())
    if(tradingParty.length === 0 || counterTradingParty.length === 0 || amount === 0){
      alert(`invalid field`)
    }
    else{
      fetch(`${SERVER_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({tradingParty, "counterParty": counterTradingParty, amount}),
      }).then((res)=>
        res.json().then((res1)=>{
          setTransactions(res1)
          turnOffVisibility()
        })
      ).catch(error => {
        console.error(error);
      });;
    }
    
  }

  return (
    <div className="App">
      <div className='wrapper'>
        <Table header={"paying"} data={transactions.filter(transaction => transaction.amount > 0)}/>
        <Table header={"recieving"} data={transactions.filter(transaction => transaction.amount < 0)}/>
      </div>
      

      <div className='buttonWrapper'>
        <button onClick={() => turnOnVisibility()}>
          add new transaction
        </button>

        <button onClick={() => compress()}>
          compress transactions
        </button>
      </div>
      <Modal isOpen={isVisable} onClose={()=> turnOffVisibility()}>
        <div style={{display:"flex", flexDirection:"column"}}>
          <label>tradingParty</label>
          <input name="tradingParty" value={tradingParty}   onChange={e => setTradingParty(e.target.value)}/>
          <label>counterParty</label>
          <input name="counterTradingParty" value={counterTradingParty}   onChange={e => setCounterTradingParty(e.target.value)}/>
          <label>amount</label>
          <input name="amount" type="number" value={amount}   onChange={e => setAmount(e.target.value)}/>
        </div>
        <button onClick={()=> submitTransaction()}>
          submit
        </button>
      </Modal>
    </div>
  );
}

export default App;
