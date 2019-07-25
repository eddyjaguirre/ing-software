import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
	Grid,
	TextField,
	Button,
	// Icon,
	Switch,
	FormControlLabel
} from '@material-ui/core';
// import { Search } from '@material-ui/icons'
import Servicio from '../components/Servicio';
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { createFactura } from "../actions/facturacionActions";
import { getNombresTecnicos } from '../actions/tecnicoActions';
import axios from 'axios';

const styles = theme => ({
	container: {
		padding: 48,
	},
	textFieldContainer: {
		backgroundColor: '#00000007',
		borderRadius: 24,
		padding: 32,
		marginBottom: 24
	},
	textFieldForm: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-evenly',
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 400,
	},
	btnContainer: {
		display: 'flex',
		justifyContent: 'flex-end',
		width: '100%',
		marginTop: 24
	},
	btnContent: {
		height: 48,
		width: '100%',
	},
	switchContainer: {
		display: 'flex',
		width: '100%',
	},
	btnLogout: {
		backgroundColor: 'red',
	}
});

class MainPage extends Component {
	state = {
		juridico: false,
		cedula: undefined,
		nombre: '',
		direccion: '',
		telefono: '',
		email: '',
		servicios: [
			// {
			// 	titulo: 'Dummy 1',
			// 	descripcion: 'Dummy data',
			// 	serial_equipo: '1234abcd',
			// 	precio: 10,
			// 	notas: 'Data para pruebas',
			// 	tecnico_id: '5d1d10dab06340191c67f18d',
			// },
			// {
			// 	titulo: 'Dummy 2',
			// 	descripcion: 'Dummy data',
			// 	serial_equipo: 'abcd1234',
			// 	precio: 15,
			// 	notas: 'Más data para pruebas',
			// 	tecnico_id: '5d1d10dab06340191c67f18d',
			// },
		],
		tecnicos: []
	}

	handleChange = (event) => {
		this.setState({juridico: event.target.checked});
	}

	handleField = (name) => (event) => {
		this.setState({
			[name]: event.target.value
		})
	}

	handleNumberField = (name) => (event) => {
		if (event.target.value >= 0) {
			this.setState({[name]: event.target.value});
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.servicios.length > 0) {
			const newCliente = {
				juridico: this.state.juridico,
				cedula: this.state.cedula,
				nombre: this.state.nombre,
				direccion: this.state.direccion,
				telefono: this.state.telefono,
				email: this.state.email,
				servicios: this.state.servicios,
			};
			
			this.props.createFactura(newCliente);
		}
	}
	
	onLogoutClick = (e) => {
		e.preventDefault();
		this.props.logoutUser();
	}

	getTecnicos = () => {
		axios
			.post("http://localhost:5000/api/tecnicos/nombres")
			.then(res => {
				// return res.data
				this.setState({tecnicos: res.data});
			})
			.catch(err =>
				console.log(err)
			);
	}

	componentDidMount() {
		this.getTecnicos();
	}

	// handleAgregar = (e) => {
	// 	e.preventDefault();
	// 	// console.log(e);
	// }

  render() {
		const {classes} = this.props;
		const {juridico, tecnicos} = this.state;

    return (
			<Grid container className={classes.container}>
				<Grid item xs={12} sm={12} md={9}>
					<div className={classes.textFieldContainer}>
						<form
							noValidate
							autoComplete='off'
							className={classes.textFieldForm}
							onSubmit={this.handleSubmit}
						>
							<FormControlLabel 
								control={
									<Switch
										checked={juridico}
										onChange={this.handleChange}
										aria-label='JuridicoSwitch'
									/>
								}
								label={ juridico ? 'Juridico' : 'Persona Natural'}
								className={classes.switchContainer}
							/>
							
							<TextField 
								id='cedula'
								label={juridico ? 'RIF' : 'Cédula'}
								className={classes.textField}
								type='number'
								margin='normal'
								variant='outlined'
								value={this.state.cedula}
								onChange={this.handleNumberField('cedula')}
							/>
							<TextField 
								id='nombre'
								label={juridico ? 'Nombre' : 'Nombre y Apellido'}
								className={classes.textField}
								margin='normal'
								variant='outlined'
								value={this.state.nombre}
								onChange={this.handleField('nombre')}
							/>
							<TextField 
								id='direccion'
								label='Dirección'
								className={classes.textField}
								margin='normal'
								variant='outlined'
								value={this.state.direccion}
								onChange={this.handleField('direccion')}
							/>
							<TextField 
								id='telefono'
								label='Teléfono'
								className={classes.textField}
								margin='normal'
								type='number'
								variant='outlined'
								value={this.state.telefono}
								onChange={this.handleNumberField('telefono')}
							/>
							<TextField 
								id='email'
								type='email'
								label='Correo Electrónico'
								className={classes.textField}
								margin='normal'
								variant='outlined'
								value={this.state.email}
								onChange={this.handleField('email')}
							/>
							{/* <Servicio tecnicos={[{_id: 0, datosPersonales: {nombre: "Eddy"}},{_id: 1, datosPersonales: {nombre: "Juan"}}]}/> */}
							{/* <Servicio tecnicos={tecnicos}/> */}
							<div className={classes.btnContainer}>
								<Button
									variant='contained'
									color='primary'
									type='submit'
									className={classes.btnContent}
								>
									Crear factura
								</Button>
							</div>
						</form>
						<Servicio 
							tecnicos={tecnicos}
							handleServicio={(servicio)=>{
								let newServicios = this.state.servicios;
								newServicios.push(servicio);
								this.setState({servicios: newServicios});
								// console.log(this.state);
							}}
						/>
					</div>
				</Grid>
				<Grid item xs={12} sm={12} md={9}>
					<Button
						onClick={this.onLogoutClick}
						variant='contained'
						color='secondary'
						className={classes.btnLogout}
					>
						Cerrar Sesión
					</Button>
				</Grid>
			</Grid>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, createFactura, getNombresTecnicos }
)(withStyles(styles)(MainPage));