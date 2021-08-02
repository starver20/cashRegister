import { useState } from 'react';
import classes from './app.module.css';
function App() {
  const [bill, setBill] = useState(0);
  const [cash, setCash] = useState(0);
  const [show, setShow] = useState(false);
  const [notesNo, setNotesNo] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [msg, setMsg] = useState('');

  const [tableClass, setTableClass] = useState(
    `${classes.table} ${classes.visible}`
  );

  const notes = [2000, 500, 100, 20, 10, 5, 1];

  let returnNotes = [];

  const onChangeBill = (e) => {
    setBill(e.target.value);
  };

  const onChangeCash = (e) => {
    setCash(e.target.value);
  };

  const calculateNotes = (e) => {
    e.preventDefault();
    if (cash < bill) {
      setMsg('Cash is less than bill amount.');
      setTableClass(`${classes.table} ${classes.visible}`);
      return;
    }

    if (cash === bill) {
      setMsg('Excat change is given.');
      setTableClass(`${classes.table} ${classes.visible}`);
      return;
    }

    setMsg('');

    let balance = cash - bill;
    returnNotes = notes.map((note) => {
      if (note > balance) {
        return 0;
      }

      let noteNumber = Math.floor(balance / note);
      balance = balance - noteNumber * note;
      return noteNumber;
    });

    setNotesNo(returnNotes);
    setTableClass(
      show ? `${classes.table}` : `${classes.table} ${classes.visible}`
    );

    console.log(returnNotes);
  };

  const changeVisibility = (e) => {
    e.preventDefault();
    if (bill < 1) {
      setMsg('Enter valid bill amount');
      return;
    }

    setMsg('');
    setShow((prevState) => {
      return !prevState;
    });
  };

  const cashClass = show
    ? `${classes.cash}`
    : `${classes.cash} ${classes.visible}`;

  const nxtBtnClass = !show
    ? `${classes.nxtbtn}`
    : `${classes.nxtbtn} ${classes.visible}`;

  return (
    <div className={classes.background}>
      <div className="App">
        <div className={classes.mainForm}>
          <h1>Cash Register Manager</h1>
          <p>
            Enter bill and cash amount to find how to pay the return amount with
            minimum notes .
          </p>
          <div className="bill">
            <form>
              <label htmlFor="bill">Bill Amount</label>
              <input type="number" onChange={onChangeBill} />
              <button
                className={nxtBtnClass}
                type="submit"
                onClick={changeVisibility}
              >
                Next
              </button>
            </form>
          </div>

          <div className={cashClass}>
            <form onSubmit={calculateNotes}>
              <label htmlFor="cash">Cash Amount</label>
              <input type="number" onChange={onChangeCash} />
              <button className={classes.chkbtn} type="submit">
                Check
              </button>
            </form>
          </div>

          <div>{msg}</div>

          <div className={tableClass}>
            <label>Return amount:</label>
            <h1>{cash - bill < 1 ? 0 : cash - bill}</h1>
            <table>
              <tbody>
                <tr>
                  <th>Notes</th>
                  <td>2000</td>
                  <td>500</td>
                  <td>100</td>
                  <td>20</td>
                  <td>10</td>
                  <td>5</td>
                  <td>1</td>
                </tr>
                <tr>
                  <th>Number</th>
                  {notesNo.map((no) => {
                    return <td>{no}</td>;
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
