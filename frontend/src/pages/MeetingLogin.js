import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getMeetingName, loginMeeting } from '../api';

export default function MeetingLogin() {
  let { meetingID } = useParams();

  const [meetingName, setMeetingName] = React.useState('Loading...');
  const [loginInputs, setLoginInputs] = React.useState({
    meetingID: meetingID,
    password: '',
  });
  const [loginResult, setLoginResult] = React.useState(null);

  const history = useHistory();

  React.useEffect(() => getMeetingName(meetingID, setMeetingName), []);

  const handleChange = (event) => {
    setLoginInputs({
      ...loginInputs,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <h1>Login</h1>
      <h3>MeetingID: {meetingID}</h3>
      <h3>Meeting Name: {meetingName}</h3>
      <form>
        <label>Password</label>
        <br />
        <br />
        <input
          type="text"
          id="password"
          name="password"
          value={loginInputs.password}
          onChange={handleChange}
        />

        <br />
        <br />

        <button
          type="button"
          onClick={() => loginMeeting(loginInputs, setLoginResult, history)}
        >
          Submit
        </button>
      </form>
      <p>
        {loginResult != null
          ? loginResult
            ? 'Password is correct! Login Successful.'
            : 'Password is incorrect. Try again.'
          : ''}
      </p>
    </>
  );
}
