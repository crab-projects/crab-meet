import axios from 'axios';

const API_PATH =
  process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';

export async function handleSubmit(meetingInputs, history) {
  console.log(meetingInputs);
  axios
    .post(API_PATH + '/api/makeMeeting', meetingInputs)
    .then((res) => {
      const { meetingID, password } = res.data;
      const newUrl = '/meetingLogin/' + meetingID;
      history.push(newUrl);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getMeetingName(meetingID, setMeetingName) {
  axios
    .get(API_PATH + '/api/meeting/' + meetingID)
    .then((res) => {
      console.log(res);
      const { meetingName } = res.data;
      setMeetingName(meetingName);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function loginMeeting(loginInputs, setLoginResult, history) {
  console.log('LOGIN INPUT: ' + loginInputs);
  const { meetingID, password } = loginInputs;
  axios
    .get(
      API_PATH +
        '/api/meetingLogin/?meetingID=' +
        meetingID +
        '&password=' +
        password
    )
    .then((res) => {
      console.log('LOGIN RESPONSE: ' + res);
      const { correct } = res.data;
      setLoginResult(correct);
      if (correct) {
        const newUrl = '/meeting/' + meetingID + '/password/' + password;
        history.push(newUrl);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getMeetingData(meetingID, password, setMeetingData) {
  axios
    .get(API_PATH + '/api/meeting/' + meetingID + '/password/' + password)
    .then((res) => {
      console.log(res);
      setMeetingData(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
