
import axios from 'axios';

export default async function handleSubmit(meetingInputs) {
  console.log(meetingInputs);
  axios.post('/api/makeMeeting', meetingInputs)
    .then((res) => {
        console.log(res)
    }).catch((error) => {
        console.log(error)
    });
}