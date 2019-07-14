import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  // Link
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const styles = theme => ({
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
  }
})

class AuthPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.formContainer}>
          <Button
            component={RouterLink}
            variant='contained'
            color='primary'
            to='/login'
            className={classes.btn}
          >
            Iniciar Sesión
          </Button>
          {/* <Link
            component={RouterLink}
            variant='contained'
            to='/registrar'
          >
            Registrar usuario nuevo
          </Link> */}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(AuthPage);