import React from 'react';
import { Link } from 'react-router-dom';

export default props => (
  <nav className="navbar">
    <div className="container">
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">Home</Link>
          <Link to="/about" className="navbar-item">About</Link>
          <Link to="/my-blog" className="navbar-item">My Blog</Link>
          <Link to="/contact" className="navbar-item">Contact</Link>
        </div>
        <div className="navbar-end">
          <a className="navbar-item" href="https://github.com/cham11ng/reactive-api"
             target="_blank"
             rel="noopener noreferrer">
              <span className="icon">
                <i className="fa fa-lg fa-github"/>
              </span>
          </a>
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
        </div>
      </div>
    </div>
  </nav>
)
