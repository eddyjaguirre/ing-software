import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
	Grid,
	TextField,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem
	// Icon,
} from '@material-ui/core';
// import { Search } from '@material-ui/icons'

const styles = theme => ({
	container: {
		padding: 48,
		display: 'flex',
		flexDirection: 'column'
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
	formControl: {
		display: 'flex',
		minWidth: 400,
  },
});

class MainPage extends Component {
	state = {
		titulo: '',
		descripcion: '',
		precio: 0,
		serial_equipo: '',
		notas: '',
		tecnico_id: '',
	}

  // static propTypes = {
  //   prop: PropTypes
	// }

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

	handleChange = (event) => {
		this.setState({tecnico_id: event.target.value});
	}

	handleAgregar = () => {
		// event.preventDefault();

		let newServicio = {
			titulo: this.state.titulo,
			descripcion: this.state.descripcion,
			serial_equipo: this.state.serial_equipo,
			precio: this.state.precio,
			notas: this.state.notas,
			tecnico_id: this.state.tecnico_id,
		};

		this.setState({
			titulo: '',
			descripcion: '',
			precio: 0,
			serial_equipo: '',
			notas: '',
			tecnico_id: '',
		})
		// console.log(newServicio);
		return newServicio;
	}

  render() {
		const { classes, tecnicos } = this.props;

    return (
			<Grid container className={classes.container}>
				<Grid item xs={12} sm={12} md={9}>
					<div className={classes.textFieldContainer}>
						<form 
							noValidate autoComplete='off' 
							className={classes.textFieldForm}
							onSubmit={(e)=>{
								e.preventDefault();
								// this.handleAgregar();
								this.props.handleServicio(this.handleAgregar());
							}}
						>
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
								id='precio'
								label='Precio'
								className={classes.textField}
								margin='normal'
								variant='outlined'
								type='number'
								value={this.state.precio}
								onChange={this.handleNumberField('precio')}
              />
              <TextField 
								id='serial_equipo'
								label='Serial del Equipo'
								className={classes.textField}
								margin='normal'
								variant='outlined'
								value={this.state.serial_equipo}
								onChange={this.handleField('serial_equipo')}
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

							<div className={classes.textField}>
								{tecnicos && <FormControl className={classes.formControl}>
									<InputLabel htmlFor="tecnicos">Técnico asignado</InputLabel>
									<Select
										value={this.state.tecnico_id}
										onChange={this.handleChange}
										inputProps={{
											name: 'tecnicos',
											id: 'tecnicos',
										}}
									>
										{tecnicos.map((tecnico)=>{
											return (<MenuItem key={tecnico._id} value={tecnico._id}>{tecnico.datosPersonales.nombre}</MenuItem>)
										})}
										{/* <MenuItem value={10}>Ten</MenuItem>
										<MenuItem value={20}>Twenty</MenuItem>
										<MenuItem value={30}>Thirty</MenuItem> */}
									</Select>
								</FormControl>}
							</div>
							<div className={classes.btnContainer}>
								<Button
									variant='contained'
									color='primary'
									className={classes.btnContent}
									type='submit'
								>
									{/* <Icon>
										<Search/>
									</Icon> */}
									Agregar
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