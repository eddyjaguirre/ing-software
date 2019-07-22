import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
	Grid,
	TextField,
	Button,
	Icon,
} from '@material-ui/core';
import { Search } from '@material-ui/icons'

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

class MainPage extends Component {
	state = {
		juridico: false,
		cedula: null,
		nombre: '',
		direccion: '',
		telefono: '',
		email: '',
		equipos: [],
	}

  // static propTypes = {
  //   prop: PropTypes
	// }

	handleChange = (event) => {
		this.setState({juridico: event.target.checked});
	}

	handleField = (name) => (event) => {
		this.setState({
			[name]: event.target.value
		})
	}

	newEquipo = () => {
		
	}

  render() {
		const { classes } = this.props;

    return (
			<Grid container className={classes.container}>
				<Grid item xs={12} sm={12} md={9}>
					<div className={classes.textFieldContainer}>
						<form noValidate autoComplete='off' className={classes.textFieldForm}>
							<TextField 
								id='titulo'
								label='Título'
								className={classes.textField}
								margin='normal'
								variant='outlined'
								value={this.state.titulo}
								onChange={this.handleField('titulo')}
              />
              <TextField 
								id='descripcion'
								label='Descripción'
								className={classes.textField}
								margin='normal'
								variant='outlined'
								value={this.state.descripcion}
								onChange={this.handleField('descripcion')}
              />
              <TextField 
								id='serial-equipo'
								label='Serial del Equipo'
								className={classes.textField}
								margin='normal'
								variant='outlined'
								value={this.state.serialEquipo}
								onChange={this.handleField('serial-equipo')}
              />
              <TextField 
								id='notas'
								label='Notas'
								className={classes.textField}
								margin='normal'
								variant='outlined'
								value={this.state.notas}
								onChange={this.handleField('notas')}
              />

							{/*<TextField 
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
              />*/}
							<div className={classes.btnContainer}>
								<Button variant='contained' color='primary' className={classes.btnContent}>
									<Icon>
										<Search/>
									</Icon>
									Buscar
								</Button>
							</div>
						</form>
					</div>
				</Grid>
			</Grid>
    )
  }
}

export default withStyles(styles)(MainPage)