import axios from 'axios';

// export const createFactura = (clientData) => dispatch => {
//   axios
//     .post("http://localhost:5000/api/facturas/create", clientData)
//     .then(()=>{
//       console.log("Factura realizada");
//     })
//     .catch(err =>
//       console.log(err)
//     );
// };

export const createFactura = (clientData) => dispatch => {
  axios
    .post("http://localhost:5000/api/facturas/create", {clientData})
    .then(()=>{
      console.log("Factura realizada");
    })
    .catch(err =>
      console.log(err)
    );
};