import axios from 'axios';

export const getNombresTecnicos = () => dispatch => {
  axios
    .post("http://localhost:5000/api/tecnicos/nombres")
    .then(res => {
      return res.data
    })
    .catch(err =>
      console.log(err)
    );
};