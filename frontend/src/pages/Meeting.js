import React from 'react';
import { useParams } from 'react-router-dom';

import { getMeetingData } from '../api';
import styled from 'styled-components';
import { Calendar, Layout } from '@components';
import { Title } from '@styles';

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

export default function Meeting() {
  const [meetingData, setMeetingData] = React.useState({});

  let { meetingID, password } = useParams();

  React.useEffect(
    () => {
      getMeetingData(meetingID, password, setMeetingData);
      console.log(meetingData);
    },
    []
  );

  const submitUserTimes = (timeValues) => {
    console.log('Called parent function.');
  }

  // Placeholder values for calendar
  const dates = [];
  const times = [];

  return (
    <Layout>
      <Title>Meeting</Title>
      {meetingData.message}

      <br />

      <CalendarWrapper>
        <Calendar key={'input'} dates timesInput submitUserTimes={(timeValues) => submitUserTimes(timeValues)} edit={true} />
        <Calendar key={'output'} dates timesInput edit={false} />
      </CalendarWrapper>
    </Layout>
  );
}
