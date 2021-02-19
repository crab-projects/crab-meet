import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { handleSubmit } from '../api';
import styled from 'styled-components';
import { Wrapper, Divider, Button } from './Home';
import { Layout } from '@components';
import { Title } from '@styles';

const Form = styled.form`
  font-family: Roboto;
`;

export default function MakeMeeting() {
  const timeIncr = 900; // seconds -> 15 min

  const [meetingInputs, setMeetingInputs] = React.useState({
    meetingName: '',
    hostName: '',
    dates: [],
    timezone: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  });

  const history = useHistory();

  const getDates = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const handleChange = (event) => {
    console.log(meetingInputs);
    if (event.target.name.includes('Date')) {
      let datesValid = true;
      const startDate =
        event.target.name === 'startDate'
          ? event.target.value
          : meetingInputs.startDate;
      const endDate =
        event.target.name === 'endDate'
          ? event.target.value
          : meetingInputs.endDate;
      if (startDate && endDate) {
        datesValid = Date.parse(startDate) <= Date.parse(endDate);
      }
      if (datesValid === true) {
        const newDates = getDates(Date.parse(startDate), Date.parse(endDate));
        setMeetingInputs({
          ...meetingInputs,
          dates: newDates,
          [event.target.name]: event.target.value,
        });
      }
      return;
    }
    setMeetingInputs({
      ...meetingInputs,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Layout>
      <Wrapper>
        <Title>🍽️ Make meeting</Title>
        <Divider />
        <Link to="/">
          <Button type="button">Go Home</Button>
        </Link>

        <br></br>
        <br></br>
        <Form>
          <label>Meeting Name: </label>
          <input
            type="text"
            id="meetingName"
            name="meetingName"
            value={meetingInputs.meetingName}
            onChange={handleChange}
          />

          <br></br>
          <br></br>

          <label>Host name: </label>
          <input
            type="text"
            id="hostName"
            name="hostName"
            value={meetingInputs.hostName}
            onChange={handleChange}
          />

          <br></br>
          <br></br>

          <label>Start date: </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={meetingInputs.startDate}
            onChange={handleChange}
          />

          <br></br>
          <br></br>

          <label>End date: </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={meetingInputs.endDate}
            onChange={handleChange}
          />

          <br></br>
          <br></br>

          <label>Timezone: </label>
          <input
            type="text"
            id="timezone"
            name="timezone"
            value={meetingInputs.timezone}
            onChange={handleChange}
          />

          <br></br>
          <br></br>

          <label>Start time: </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={meetingInputs.startTime}
            step={timeIncr}
            onChange={handleChange}
          />

          <br></br>
          <br></br>

          <label>End time: </label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={meetingInputs.endTime}
            step={timeIncr}
            onChange={handleChange}
          />

          <br />
          <br />

          <Button
            type="button"
            onClick={() => handleSubmit(meetingInputs, history)}
          >
            Submit
          </Button>
        </Form>
      </Wrapper>
    </Layout>
  );
}
