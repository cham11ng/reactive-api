import React from 'react';
import Session from '../../utils/Session';
import { Link, withRouter } from 'react-router-dom';
import * as authService from '../../services/authService';

export default withRouter(({history}) => (
  Session.get('isAuthenticated') ? (
    <div className="navbar-item">
      <div className="field is-grouped">
        <div className="control">
          <button className="button" onClick={() => authService.logout().then(() => history.push('/'))}>Logout</button>
        </div>
      </div>
    </div>
  ) : (
    <div className="navbar-item">
      <div className="field is-grouped">
        <div className="control">
          <Link to="/login">
            <button className="button">Login</button>
          </Link>
        </div>
        <div className="control">
          <Link to="/register">
            <button className="button">Register</button>
          </Link>
        </div>
      </div>
    </div>
  )
));
