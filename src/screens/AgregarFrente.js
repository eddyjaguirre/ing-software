import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
	Grid,
	TextField,
	Button,
	Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { registerEmpleado } from '../actions/authActions';

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
	}
});

class AgregarFrente extends Component {
  state = {
		nombre: '',
    cedula: null,
    rif: '',
		direccion: '',
		telefono: '',
		especialidad: '',
		email: '',
		password: ''
  }
  
  handleField = (name) => (event) => {
		this.setState({
			[name]: event.target.value
		})
	}

	generarPassword = () => {
		let newPassword = Math.random().toString(36).substr(2, 8);
		return newPassword
	}

	handleSubmit = e => {
		e.preventDefault();
		let newPassword = this.generarPassword();
		this.setState({password: newPassword})
    const newUser = {
			nombre: this.state.nombre,
			cedula: this.state.cedula,
			rif: this.state.rif,
			direccion: this.state.direccion,
			telefono: this.state.telefono,
			email: this.state.email,
			password: newPassword,
			nivelUsuario: 2,
    };
		this.props.registerEmpleado(newUser);
		// console.log(newUser)
		// console.log(JSON.stringify(newUser))
  }

  render() {
    const {classes} = this.props;

    return (
      <Grid container className={classes.container}>
				<Grid item xs={12} sm={12} md={9}>
					<div className={classes.textFieldContainer}>
            <Typography 
              align='center'
              variant='h2'
            >
              Agregar Empleado Nuevo
            </Typography>
						<form
							noValidate
							autoComplete='off'
							className={classes.textFieldForm}
							onSubmit={this.handleSubmit}
						>
              <TextField 
								id='nombre'
								label={'Nombre y Apellido'}
								className={classes.textField}
								margin='normal'
								variant='outlined'
								value={this.state.nombre}
								onChange={this.handleField('nombre')}
							/>
              <TextField 
								id='cedula'
								label={'Cédula'}
								className={classes.textField}
								type='number'
								margin='normal'
								variant='outlined'
								value={this.state.cedula}
								onChange={this.handleField('cedula')}
							/>
							<TextField 
								id='rif'
								label={'RIF'}
								className={classes.textField}
								margin='normal'
								variant='outlined'
								value={this.state.rif}
								onChange={this.handleField('rif')}
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
								onChange={this.handleField('telefono')}
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
							<div className={classes.btnContainer}>
								<Button
									variant='contained'
									color='primary'
									className={classes.btnContent}
									type='submit'
								>
									Agregar
								</Button>
							</div>
						</form>
					</div>

					<div>
						{(this.state.password.length > 0) && `La contraseña generada es: ${this.state.password}`}
					</div>
				</Grid>
			</Grid>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
})


export default connect(
  mapStateToProps,
  { registerEmpleado }
)(withStyles(styles)(AgregarFrente));