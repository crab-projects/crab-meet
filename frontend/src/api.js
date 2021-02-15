
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const API_PATH = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';

export async function handleSubmit(meetingInputs, history) {
  console.log(meetingInputs);
  axios.post(API_PATH + '/api/makeMeeting', meetingInputs)
    .then((res) => {
        const { meetingID, password } = res.data;
        const newUrl = '/meeting/' + meetingID;
        history.push(newUrl);
    }).catch((error) => {
        console.log(error)
    });
}

export async function getMeetingData(meetCode, setMeetingData) {
  axios.get(API_PATH + '/api/' + meetCode)
    .then((res) => {
      console.log(res);
      setMeetingData(res.data);
    }).catch((error) => {
      console.log(error);
    });
}