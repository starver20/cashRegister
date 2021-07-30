import {useState} from 'react'
import classes from './app.module.css'
function App() {

  const [bill, setBill] = useState(0)
  const [cash, setCash] = useState(0)
  const notes = [2000, 500, 100, 20, 10, 5, 1];

  const onChangeBill = (e)=> {
    setBill(e.target.value);  
  }

  const onChangeCash = (e)=> {
    setCash(e.target.value)
  }

  const calculateNotes = (e) => {
    e.preventDefault();
    let balance = cash-bill;
    let returnNotes = notes.map(note=> {
      if(note>balance){
        return 0;
      }

      let noteNumber =  Math.floor(balance/note)
        balance = balance-noteNumber*note;
        return noteNumber;
    })

    console.log(returnNotes)
  }

  return <div className="App">
    <div className={classes.mainForm}>

      <div className="bill">
        <form action="" >
        <label htmlFor="bill">Bill Amount</label>
        <input type="number" onChange={onChangeBill}/>
        <button className={classes.nxtbtn} type="submit">Next</button>
        </form>
      </div>
      

      <div className="cash">
        <form action="" onSubmit={calculateNotes}>
        <label htmlFor="cash">Cash Amount</label>
        <input type="number" onChange={onChangeCash}/>
        <button className={classes.chkbtn} type="submit">Check</button>
        </form>
      </div>

      <div>

      </div>
      <h1>{bill-cash}</h1>

    </div>
  </div>;
}

export default App;
