import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
	TextField,
  Button,
  // Link,
} from '@material-ui/core';
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
// import { Link as RouterLink } from 'react-router-dom';

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

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.auth.isAuthenticated) {
  //     this.props.history.push("/dashboard");
  //   }
  //   if (nextProps.errors) {
  //     this.setState({
  //       errors: nextProps.errors
  //     });
  //   }
  // }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  handleField = (name) => (event) => {
		this.setState({
			[name]: event.target.value
		})
  }
  
  handleSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData);
  }

  render() {
    const { classes } = this.props;
    const { errors } = this.state;

    return (
      <div className={classes.container}>
        <div className={classes.formContainer}>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <TextField 
              id='email'
              type='email'
              label='Correo Electrónico'
              className={classes.textField}
              margin='normal'
              variant='outlined'
              value={this.state.email}
              onChange={this.handleField('email')}
              error={errors.email}
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
              error={errors.password}
            />
            <Button
              variant='contained'
              color='primary'
              className={classes.btn}
              type='submit'

            >
              Iniciar Sesión
            </Button>
          </form>
          {/* <Link
            component={RouterLink}
            to="/registrar"
          >
            No tengo cuenta
          </Link> */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withStyles(styles)(LoginForm));