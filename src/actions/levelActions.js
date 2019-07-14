import axios from 'axios';

export const getUserLevels = () => dispatch => {
  axios
    .post("http://localhost:5000/api/levels/")
    .then(res => {
      return res.data
    })
    .catch(err =>
      console.log(err)
    );
};