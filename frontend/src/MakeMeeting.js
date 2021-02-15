import React from 'react';
import { Link } from 'react-router-dom';
import { handleSubmit } from './api';

export default function MakeMeeting() {

  const [meetingInputs, setMeetingInputs] = React.useState({
    meetingName: "",
    hostName: ""
  });

  const handleChange = (event) => {
    setMeetingInputs({
      ...meetingInputs,
      [event.target.name]: event.target.value
    });
  }

  return (
    <>
      <h1>Make Meeting</h1>
      <Link to="/">
        <button type="button">Go Home</button>
      </Link>

      <br></br>
      <br></br>
      <form>
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

        <br />
        <br />

        <button
          type="button"
          onClick={() => handleSubmit(meetingInputs)}
        >
          Submit
        </button>
      </form>
    </>
  );
}