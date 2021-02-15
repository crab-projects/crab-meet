import React from 'react';
import { useParams } from 'react-router-dom';
import { getMeetingData } from './api';

export default function Meeting() {

  const [ meetingData, setMeetingData ] = React.useState({});

  let { meetCode } = useParams();

  React.useEffect(() => getMeetingData(meetCode, setMeetingData), []);

  return (
    <>
      <h1>Hello</h1>
      {meetingData.message}
    </>
  );
}