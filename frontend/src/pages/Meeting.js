import React from 'react';
import { useParams } from 'react-router-dom';
import { getMeetingData } from '../api';

export default function Meeting() {
  const [meetingData, setMeetingData] = React.useState({});

  let { meetingID, password } = useParams();

  React.useEffect(
    () => getMeetingData(meetingID, password, setMeetingData),
    []
  );

  return (
    <>
      <h1>Meeting</h1>
      {meetingData.message}
    </>
  );
}
