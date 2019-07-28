import React, {Component} from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { Link as RouterLink } from 'react-router-dom';

const styles = theme => ({
  iconButton: {
    marginRight: 20
  }
});

class NavBar extends Component {
  state = {
    anchorEl: null,
  }
  handleMenu = (event) => {
    this.setState({anchorEl: (this.state.anchorEl ? null : event.currentTarget)});
  }
  handleClose = () => {
    this.setState({anchorEl: null});
  }

  render(){
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
  
    return (
      <AppBar>
        <Toolbar>
          <IconButton
            className={classes.iconButton}
            color='inherit'
            aria-label='Menu'
            aria-owns={open ? 'menu-navbar' : undefined}
            aria-haspopup='true'
            onClick={this.handleMenu}
          >
            <MenuIcon />
            <Menu
              id='menu-navbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'right'
              }}
              // transformOrigin={{
              //   vertical: 'bottom',
              //   horizontal: 'right'
              // }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem component={RouterLink} to='/dashboard'>Nueva Entrada</MenuItem>
              <MenuItem component={RouterLink} to='/agregar-tecnico'>Agregar Técnico</MenuItem>
              <MenuItem component={RouterLink} to='/agregar-empleado'>Agregar Empleado</MenuItem>
              <MenuItem component={RouterLink} to='/pendientes-tecnico'>Equipos Pendientes</MenuItem>
              {/* <MenuItem>Equipos Pendientes</MenuItem>
              <MenuItem>Listado de Técnicos</MenuItem>
              <MenuItem>Agregar Servicios Nuevos</MenuItem> */}
            </Menu>
          </IconButton>
          <Typography variant='h6' color='inherit'>
            Ing Software
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }

}

export default withStyles(styles)(NavBar);