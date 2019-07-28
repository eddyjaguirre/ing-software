import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
	Grid,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
  Paper,
  Button
} from '@material-ui/core';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const styles = theme => ({
	container: {
		padding: 48,
		display: 'flex',
		flexDirection: 'column'
  },
	btnUpdateCompletado: {
    backgroundColor: '#00cc00',
    color: 'white',
  },
  btnUpdatePendiente: {
    backgroundColor: 'red',
    color: 'white',
  },
});

class MostrarServicio extends Component {
	state = {
    user: '',
    pendientes: [],
  }
  
  componentDidMount() {
    const user = jwt_decode(localStorage.jwtToken);
    this.setState({user: user._id})
    this.getPendientes({tecnico_id: user._id});
  }

  getPendientes = (tecnicoId) => {
		axios
			.post("http://localhost:5000/api/tecnicos/pendientes", tecnicoId)
			.then(res => {
				this.setState({pendientes: res.data});
			})
			.catch(err =>
				console.log(err)
			);
  }

  updateCompletado = (newServicio) => {
    axios
			.post("http://localhost:5000/api/facturas/update-servicio", newServicio)
			.then(res => {
				this.getPendientes({tecnico_id: this.state.user});
			})
			.catch(err =>
				console.log(err)
			);
  }
  
  handleCompletado = (servicio) => {
    const newServicio = servicio;
    newServicio.completado = !servicio.completado;
    this.updateCompletado(newServicio);
  }

	
  render() {
    const { classes } = this.props;
    const { pendientes } = this.state;

    return (
			<Grid container className={classes.container}>
				<Grid item xs={12} sm={12} md={12}>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell size='small'>Titulo</TableCell>
                  <TableCell>Descripcion</TableCell>
                  <TableCell size='small'>Serial</TableCell>
                  <TableCell>Notas</TableCell>
                  <TableCell size='small'>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  pendientes.map(row => (
                    <TableRow key={row._id}>
                      <TableCell>{row.titulo}</TableCell>
                      <TableCell>{row.descripcion}</TableCell>
                      <TableCell>{row.serial_equipo}</TableCell>
                      <TableCell>{row.notas}</TableCell>
                      <TableCell>
                        <Button
                          variant='contained'
                          className={row.completado ? classes.btnUpdateCompletado : classes.btnUpdatePendiente}
                          onClick={()=>{
                            this.handleCompletado(row);
                          }}
                        >
                          {row.completado ? 'Completado' : 'Pendiente'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </Paper>
				</Grid>
			</Grid>
    )
  }
}

export default withStyles(styles)(MostrarServicio)