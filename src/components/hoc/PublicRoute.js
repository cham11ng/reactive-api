import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Session from '../../utils/Session';

export default ({component: Component, ...rest}) => (
  <Route {...rest} render={props => (
    Session.get('isAuthenticated') ? (
      <Redirect to={{
        pathname: '/',
        state: {from: props.location}
      }}/>
    ) : (
      <Component {...props}/>
    )
  )}/>
)
