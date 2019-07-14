import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import AppContent from './components/AppContent';

import MainPage from './screens/MainPage';
import AgregarTecnico from './screens/AgregarTecnico';
import Login from './screens/Login';
import Signup from './screens/Signup';
import AuthPage from './screens/AuthPage';
import AgregarFrente from "./screens/AgregarFrente";
import Forbidden from "./screens/Forbidden";

import CssBaseline from '@material-ui/core/CssBaseline';

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import PrivateRoute from './components/PrivateRoute';

import './App.css';

if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <CssBaseline/>
        <Router>  
          <NavBar/>
          <AppContent>
            <Route exact path='/' component={AuthPage}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/registrar' component={Signup}/>
            <Route exact path='/forbidden' component={Forbidden}/>
            <Switch>
              <PrivateRoute exact path='/agregar-tecnico' component={AgregarTecnico} roles={[0]}/>
              <PrivateRoute exact path='/agregar-empleado' component={AgregarFrente} roles={[0]}/>
              <PrivateRoute exact path='/dashboard' component={MainPage}/>
            </Switch>
          </AppContent>
        </Router>
      </Provider>
    );
  }
}

// const mapStateToProps = state => ({
//   auth: state.auth,
// });

// export default connect(mapStateToProps)(App);
export default App;
