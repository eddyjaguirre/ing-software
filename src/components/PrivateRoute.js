import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";


const PrivateRoute = ({ component: Component, roles, auth, ...rest }) => (
  <Route {...rest} render={props => {
    const userRole = jwt_decode(localStorage.jwtToken).nivelUsuario;
    if (!auth.isAuthenticated) {
        // not logged in so redirect to login page with the return url
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    }

    // check if route is restricted by role
    if (roles && roles.indexOf(userRole) === -1) {
        // role not authorised so redirect to home page
        return <Redirect to={{ pathname: '/forbidden'}} />
    }

    // authorized so return component
    return <Component {...props} />
}} />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);