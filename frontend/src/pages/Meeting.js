import React from 'react';
import { useParams } from 'react-router-dom';

import { getMeetingData, inputUserTimes } from '../api';
import styled from 'styled-components';
import { Calendar, Layout } from '@components';
import { Title, Button } from '@styles';

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const NameInput = styled.input`
  width: 40%;
  margin-left: 2rem;
`;

const ButtonWrapper = styled.div`
  width: 150px;
`;

export default function Meeting() {

  const [ meetingData, setMeetingData ] = React.useState({});
  const [ timeData, setTimeData ] = React.useState({});

  const [ userName, setUserName ] = React.useState('');

  

  let { meetingID, password } = useParams();
  console.log(meetingID + ' ' + password);
  
  React.useEffect(
    () => {
      getMeetingData(meetingID, password, setMeetingData, setTimeData);
    },
    []
  );

  const submitUserTimes = (times) => {
    inputUserTimes(meetingID, password, userName, times);
  };

  const copyLink = (str) => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
  
  const LOCAL = true;

  const meetingLink = window.location.hostname + (LOCAL === true ? ':' + window.location.port : '') + '/meetingLogin/' + meetingID;
  const calendarData = {
    ...meetingData,
    ...timeData
  };
  console.log('CALENDAR DATA: ');
  console.log(calendarData);
  return (
    <Layout>
      <Title>Meeting</Title>
      <p>Meeting link: {meetingLink}</p>
      <ButtonWrapper><Button onClick={() => copyLink(meetingLink)}>Copy link</Button></ButtonWrapper>
      <p>Meeting password: {password}</p>

      <br />

      <NameInput type='text' value={userName} onChange={(event) => setUserName(event.target.value)}/>

      <br />

      <CalendarWrapper>
        <Calendar key={'input'} meetingData={calendarData} submitUserTimes={(timeValues) => submitUserTimes(timeValues)} edit={true} />
        <Calendar key={'output'} meetingData={calendarData} edit={false} />
      </CalendarWrapper>
    </Layout>
  );
}
