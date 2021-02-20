import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  
`;

const Grid = styled.table`
  margin: auto;
  border-collapse: collapse;
  
  td {
    border: 1px solid var(--grey-3);
    width: 50px;
    height: 15px;
  }
`;

const Button = styled.button`
  font-family: Roboto;
  font-weight: 300;
  font-size: 15px;
  background: #ff9e78;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 15px 20px 15px 20px;
  transition: 0.15s;

  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const ButtonBox = styled.div`
  width: 100px;
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  margin: auto;
`; 

const Calendar = (props) => {
 
  const {startDate, endDate, startTime, endTime, timesInput, submitUserTimes, edit} = props;
  
  const [ timeValues, setTimeValues ] = React.useState(new Array(24 * 7).fill(false));

  console.log(timeValues);

  const [ mouseDown, setMouseDown ] = React.useState(false);
  const [ busy, setBusy ] = React.useState(false);
 
  const handleMouseDown = (newBusy) => {
    setMouseDown(true);
    setBusy(newBusy);
  }

  const handleMouseUp = () => {
    setMouseDown(false);
  }

  const handleDrag = (index) => {
    //console.log(index);
    updateTimes(index);
  }

  const updateTimes = (index) => {
    if (edit === true) {
      const newTimeValues = [...timeValues];
      newTimeValues[index] = busy;
      if (mouseDown)
        setTimeValues(newTimeValues);
    }
  }

  const processTimes = () => {
    console.log(timeValues);
    submitUserTimes(timeValues);
  }

  React.useEffect(() => {
    console.log(mouseDown);
  }, []);


  const nDays = 7;
  const timeIncr = 60;
  const hours = 24;
  const nTimes = hours * 60 / timeIncr;
  const rows = [];
  const times = [];
  for (let time = 0; time < nTimes; time++) {
    const days = [];
    for (let day = 0; day < nDays; day++) {
      const index = day * nTimes + time;
      days.push(<td 
                  key={index}
                  style={{background: (timeValues[index] ? '#ff9e78' : 'transparent')}}
                  onMouseDown={() => handleMouseDown(!timeValues[index])}
                  onMouseUp={handleMouseUp}
                  onMouseOver={() => handleDrag(index)}>
                </td>);
    }
    times.push(<tr>{days}</tr>);
  }

  return (
    <Wrapper>
      <div>
        <Grid>
          {times}
        </Grid>
      </div>
      <ButtonBox>
        <Button>{'<'}</Button>
        <Button>{'>'}</Button>
      </ButtonBox>
      {edit && <Button onClick={() => processTimes()}>Submit</Button>}
    </Wrapper>
  );
}

export default Calendar;