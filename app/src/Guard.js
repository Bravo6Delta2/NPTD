import React from 'react';
import { Route, Redirect } from "react-router-dom";
import jwt from 'jwt-decode'
class Guard extends React.Component {
    constructor(props){
        super(props);

    }
    render() {
       
        const Component = this.props.component;
        let isAuthenticated = true;
        if(localStorage.getItem('token') == null || jwt(localStorage.getItem('token')).exp <  (new Date().getTime() + 1) / 1000)
        isAuthenticated = false ;
        
       
        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to={{ pathname: '/login' }} />
        );
    }
}

export default Guard;