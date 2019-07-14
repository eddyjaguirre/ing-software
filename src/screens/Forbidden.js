import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
	Grid,
  Typography,
  Link
} from '@material-ui/core';
import { connect } from 'react-redux';
import { registerEmpleado } from '../actions/authActions';
import { Link as RouterLink } from 'react-router-dom';

const styles = theme => ({
	container: {
		padding: 48,
	},
});

class AgregarTecnico extends Component {
  render() {
    const {classes} = this.props;

    return (
      <Grid container className={classes.container}>
				<Grid item xs={12} sm={12} md={9}>
          <Typography 
            align='center'
            variant='h2'
          >
            Usted no posee permisos para acceder a este módulo
          </Typography>
          <Link
            component={RouterLink}
            variant='contained'
            to='/dashboard'
          >
            Regresar
          </Link>
				</Grid>
			</Grid>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
})

// export default withStyles(styles)(AgregarTecnico);
export default connect(
  mapStateToProps,
  { registerEmpleado }
)(withStyles(styles)(AgregarTecnico));