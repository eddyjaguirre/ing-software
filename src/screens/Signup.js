import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  Link,
  // FormControl,
  // InputLabel,
  // Select,
  // MenuItem
} from '@material-ui/core';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions';
import { Link as RouterLink } from 'react-router-dom';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: '90%',
  },
  container: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#00000007',
    minWidth: '40vw',
		borderRadius: 24,
		padding: 32,
		marginBottom: 24
  },
  btn: {
    color: '#fff',
    marginBottom: 20,
    marginTop: 20,
  },
})

class SignupForm extends Component {
  state = {
    password: '',
    email: '',
    nombre: '',
    nivelUsuario: null,
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  
  handleField = (name) => (event) => {
		this.setState({
			[name]: event.target.value
		})
  }

  handleChange = (event) => {
    this.setState({nivelUsuario: event.target.value})
  }

  handleSubmit = e => {
    e.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password,
      datosPersonales: {
        nombre: this.state.nombre
      },
    };
    this.props.registerUser(newUser, this.props.history);
  }
  
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.formContainer}>

          <form className={classes.form} onSubmit={this.handleSubmit}>
            <TextField 
              id='nombre'
              label='Nombre'
              className={classes.textField}
              type='text'
              margin='normal'
              variant='outlined'
              value={this.state.nombre}
              onChange={this.handleField('nombre')}
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
            <TextField 
              id='password'
              label='Contraseña'
              className={classes.textField}
              type='password'
              margin='normal'
              variant='outlined'
              value={this.state.password}
              onChange={this.handleField('password')}
            />
            {/* <FormControl className={classes.formControl}>
              <InputLabel htmlFor="nivel-usuario">Nivel de Usuario</InputLabel>
              <Select
                value={this.state.nivelUsuario}
                onChange={this.handleChange}
                inputProps={{
                  name: 'nivel-usuario',
                  id: 'nivel-usuario',
                }}
              >
                
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl> */}
            <Button
              variant='contained' 
              color='primary'
              className={classes.btn}
              type='submit'
            >
              Crear cuenta
            </Button>
          </form>
          <Link
            component={RouterLink}
            to="/login"
          >
            Ya tengo una cuenta
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
})

export default connect(
  mapStateToProps,
  { registerUser }
)(withStyles(styles)(SignupForm));