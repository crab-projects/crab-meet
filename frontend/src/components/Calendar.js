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
 
  const { meetingData, submitUserTimes, edit} = props;

  const [ mouseDown, setMouseDown ] = React.useState(false);
  const [ busy, setBusy ] = React.useState(false);

  const datetimeToDate = (date) => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return [yyyy, mm, dd].join('-');
  }

  const datetimeToTime = (date) => {
    return date.getHours() + ':' + date.getMinutes() + ':00';
  }

  /**
   * Takes a string value time of format 'hh:mm:ss-tt'
   * and converts to a date object of current time
   */
  const timeToDatetime = (time) => {
    const datetime = new Date();
    const [ hh, mm, ss ] = time.split(':');
    datetime.setHours(hh, mm, ss.split('+')[0]);
    return datetime;
  }

  const addDays = (date, days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  const addMinutes = (date, minutes) => {
    return new Date(date.getTime() + minutes * 60 * 1000);
  }

  const defaultDate = datetimeToDate(addDays(new Date(), -3));
  const defaultStartTime = '09:00:00-00';
  const defaultEndTime = '17:00:00-00';
  let { startDate, endDate, startTime, endTime, timeInputs } = meetingData;
  startDate = startDate ? startDate.substring(0, 10) : defaultDate;
  endDate = endDate ? endDate.substring(0, 10) : datetimeToDate(addDays(Date.parse(startDate), 3));
  startTime = startTime ? startTime : defaultStartTime;
  endTime = endTime ? endTime : defaultEndTime;

  

  const nDays = 7;
  const timeIncr = 60; // minutes
  const hours = 24;
  const nTimes = hours * 60 / timeIncr;

  const fillInitialTimes = (startDate, endDate, startTime, endTime, timeInputs) => {
    // just account for a single week rn
    // nullify days of week not in timeframe
    // nullify times not in timeframe
    console.log('DATA: ');
    console.log(startDate);
    console.log(endDate);
    // console.log(startTime);
    // console.log(endTime);
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    const startDatetime = timeToDatetime(startTime);
    const endDatetime = timeToDatetime(endTime);
    const timeVals = new Array(24 * 7).fill(false);
    const startDateDay = (startDate.getDay() + 1) % 7;
    const endDateDay = (endDate.getDay() + 1) % 7;
    for (let day = 0; day < nDays; day++) {
      for (let time = 0; time < nTimes; time++) {
        const index = day * nTimes + time;
        console.log(startDateDay, endDateDay, day);
        timeVals[index] = (day >= startDateDay && day <= endDateDay) ? timeValues[index] : null;
        const thisDatetime = addMinutes(timeToDatetime('00:00:00+00'), timeIncr * time);
        //console.log('thisDatetime ' + thisDatetime, startDatetime, endDatetime);
        timeVals[index] = (thisDatetime >= startDatetime && thisDatetime < endDatetime) ? timeVals[index] : null;
      }
    }
    return timeVals;
  }

  
  const [ timeValues, setTimeValues ] = React.useState(() => fillInitialTimes(startDate, endDate, startTime, endTime, timeInputs));

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
    if (edit === true && timeValues[index] !== null) {
      const newTimeValues = [...timeValues];
      newTimeValues[index] = busy;
      if (mouseDown)
        setTimeValues(newTimeValues);
    }
  }
  /**
   * Convert timeValues ([true, false, true, ...]) to an array of
   * strings in postgres date time format
   */
  const processTimes = () => {
    const times = [];
    for (let day = 0; day < nDays; day++) {
      for (let time = 0; time < nTimes; time++) {
        const index = day * nTimes + time;
        if (timeValues[index]) {
          const value = addMinutes(addDays(startDate, day), timeIncr * time);
          let newTime = {
            start: value,
            end: addMinutes(value, timeIncr) // start + timeIncr
          };
          const prevTime = times[times.length - 1];
          if (prevTime && prevTime.end.getTime() === newTime.start.getTime()) {
            // merge this value into last time if it was right before
            newTime = {
              start: times[times.length - 1].start,
              end: newTime.end
            };
            times.pop();
          }
          times.push(newTime);
        }
      }
    }
    submitUserTimes(times);
  }

  React.useEffect(() => {
    setTimeValues(() => fillInitialTimes(startDate, endDate, startTime, endTime, timeInputs));
  }, [meetingData]);


  const rows = [];
  const times = [];
  for (let time = 0; time < nTimes; time++) {
    const days = [];
    for (let day = 0; day < nDays; day++) {
      const index = day * nTimes + time;
      days.push(<td 
                  key={index}
                  style={{background: (timeValues[index] === null ? 'var(--grey-2)' : timeValues[index] ? '#ff9e78' : 'transparent')}}
                  onMouseDown={() => handleMouseDown(!timeValues[index])}
                  onMouseUp={handleMouseUp}
                  onMouseOver={() => handleDrag(index)}>
                </td>);
    }
    times.push(<tr key={time}>{days}</tr>);
  }

  return (
    <Wrapper>
      <div>
        <Grid>
          <tbody>
            {times}
          </tbody>
        </Grid>
      </div>
      <ButtonBox>
        <Button key={'left'}>{'<'}</Button>
        <Button key={'right'}>{'>'}</Button>
      </ButtonBox>
      <br />
      {edit && <Button onClick={() => processTimes()}>Submit</Button>}
    </Wrapper>
  );
}

export default Calendar;