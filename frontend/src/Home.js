import React from 'react';
import { Link } from 'react-router-dom';


export default function Home() {
    const [ times, setTimes] = React.useState(["busy", "busy", "busy"]);

    const handleChange = (index) => {
      const newTimes = [...times];
      newTimes[index] = newTimes[index] === 'busy' ? 'free' : 'busy';
      setTimes(newTimes);
    }

    return (
      <>
        <style>{`
          table, tr, td {
            border: 1px solid black;
            border-collapse: collapse;
          }
          td {
            width: 100px;
            height: 100px;
            text-align: center;
          }
        `}</style>
        <h1>Home</h1>
        <Link to="/make">
          <button type="button">Make Meeting</button>
        </Link>
        <table>
          <tr>
          {times.map((time, index) => <td onClick={() => handleChange(index)} value={times[index]}>{time}</td>)}
          </tr>
        </table>
      </>
    );
  }