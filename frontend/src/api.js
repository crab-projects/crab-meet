import axios from 'axios';

const API_PATH =
  process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';

export async function handleSubmit(meetingInputs, history) {
  console.log(meetingInputs);
  axios
    .post(API_PATH + '/api/makeMeeting', meetingInputs)
    .then((res) => {
      const { meetingID, password } = res.data;
      const newUrl = '/meeting/' + meetingID + '/password/' + password;
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

export async function inputUserTimes(meetingID, password, userName, times) {
  console.log('Username: ' + userName);
  console.log('Times: ' + times);

  axios
    .post(API_PATH + '/api/userInput/' + meetingID, { password, userName, times })
    .then((res) => {
      //const { createUserMessage, inputTimesMessage } = res.data;
      console.log('Response: ' + res);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getMeetingData(meetingID, password, setMeetingData, setTimeData) {
  axios
    .get(API_PATH +
        '/api/meeting/?meetingID=' +
        meetingID +
        '&password=' +
        password
    )
    .then((res) => {
      console.log('GET TIMEVALUES RES: ');
      console.log(res);
      const newTimeData = {
        ...res.data
      }
      console.log(newTimeData)
      setTimeData(newTimeData);
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .get(API_PATH + '/api/meeting/' + meetingID)
    .then((res) => {
      console.log('GET MEETING DATA RES: ');
      console.log(res);
      const newMeetingData = {
        ...res.data
      }
      setMeetingData(newMeetingData);
    })
    .catch((error) => {
      console.log(error);
    });
}
