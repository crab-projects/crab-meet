import React from 'react';
import { useParams } from 'react-router-dom';
import { getMeetingName } from './api';

export default function MeetingLogin() {

  const [ meetingName, setMeetingName ] = React.useState('Loading...');

  let { meetingID } = useParams();
  
  React.useEffect(() => getMeetingName(meetingID, setMeetingName), []);

  return (
    <>
      <h1>Login</h1>
      <h3>MeetingID: { meetingID }</h3>
      <h3>Meeting Name: { meetingName }</h3>
      <p>Password: </p>
      <input type='text' />
    </>
  );
}