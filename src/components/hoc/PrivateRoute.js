import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Session from '../../utils/Session';

export default ({component: Component, ...rest}) => (
  <Route {...rest} render={props => (
    Session.get('isAuthenticated') ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: {from: props.location}
      }}/>
    )
  )}/>
)
