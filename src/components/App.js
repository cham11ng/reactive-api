import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Menu from './menu/Menu';
import Header from './headers/Header';

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import MyBlog from './pages/MyBlog';
import NoMatch from './pages/NoMatch';
import Contact from './pages/Contact';
import Register from './pages/Register';

import PublicRoute from './hoc/PublicRoute';
import PrivateRoute from './hoc/PrivateRoute';

export default function () {
  return (
    <Router>
      <div className="App">
        <Menu/>
        <Header title="cham11ng's Blog" subTitle="Informational, Discussion, Inspirational"/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/contact" component={Contact}/>

          <PublicRoute path="/login" component={Login}/>
          <PublicRoute path="/register" component={Register}/>

          <PrivateRoute path="/my-blog" component={MyBlog}/>

          <Route component={NoMatch}/>
        </Switch>
      </div>
    </Router>
  );
}
