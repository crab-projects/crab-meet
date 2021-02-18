import React from 'react';
import { useParams } from 'react-router-dom';
import { getMeetingData } from '../api';
import { Calendar } from '@components/index.js';
import styled from 'styled-components';

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;


export default function Meeting() {
  const [meetingData, setMeetingData] = React.useState({});

  let { meetingID, password } = useParams();

  React.useEffect(
    () => getMeetingData(meetingID, password, setMeetingData),
    []
  );

  // Placeholder values for calendar
  const dates = [];
  const times = [];
  const edit = true;

  return (
    <>
      <h1>Meeting</h1>
      {meetingData.message}

      <br/>

      <CalendarWrapper>
        <Calendar dates times edit/>
        <Calendar dates times edit/>
      </CalendarWrapper>
   </>
  );
}
