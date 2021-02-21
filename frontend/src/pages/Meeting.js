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

  const [meetingData, setMeetingData] = React.useState({});

  const [ userName, setUserName ] = React.useState('');

  let { meetingID, password } = useParams();
  console.log(meetingID + ' ' + password);

  React.useEffect(
    () => {
      getMeetingData(meetingID, password, setMeetingData);
      console.log(meetingData);
    },
    []
  );

  React.useEffect(
    () => {
      console.log(userName);
    },
    [userName]
  );

  const submitUserTimes = (times) => {
    inputUserTimes(userName, times);
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



  // Placeholder values for calendar
  const dates = [];
  const times = [];

  const LOCAL = true;

  const meetingLink = window.location.hostname + (LOCAL === true ? ':' + window.location.port : '') + '/meetingLogin/' + meetingID;

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
        <Calendar key={'input'} meetingData submitUserTimes={(timeValues) => submitUserTimes(timeValues)} edit={true} />
        <Calendar key={'output'} meetingData edit={false} />
      </CalendarWrapper>
    </Layout>
  );
}
