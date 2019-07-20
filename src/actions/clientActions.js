import axios from 'axios';

export const getClientList = () => dispatch => {
  axios
    .post("http://localhost:5000/api/clientes/get-list")
    .then(res => {
      return res.data
    })
    .catch(err =>
      console.log(err)
    );
};

export const createClient = (clientData) => dispatch => {
  axios
    .post("http://localhost:5000/api/clientes/create", clientData)
    .then(()=>{
      console.log("Cliente Registrado");
    })
    .catch(err =>
      console.log(err)
    );
};