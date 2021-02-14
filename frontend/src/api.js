
import axios from 'axios';

const API_PATH = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';

export default async function handleSubmit(meetingInputs) {
  console.log(meetingInputs);
  axios.post(API_PATH + '/api/makeMeeting', meetingInputs)
    .then((res) => {
        console.log(res.data)
    }).catch((error) => {
        console.log(error)
    });
}