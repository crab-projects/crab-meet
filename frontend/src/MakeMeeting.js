import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { handleSubmit } from './api';
import { Wrapper, Title, Divider, Button } from './Home';
import styled from 'styled-components';

const Form = styled.form`
  font-family: Roboto;
`;

export default function MakeMeeting() {

  const [meetingInputs, setMeetingInputs] = React.useState({
    meetingName: "",
    hostName: ""
  });

  const history = useHistory();

  const handleChange = (event) => {
    setMeetingInputs({
      ...meetingInputs,
      [event.target.name]: event.target.value
    });
  }

  return (
    <Wrapper>
      <Title>🍽️ Make meeting</Title>
      <Divider/>
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
  );
}