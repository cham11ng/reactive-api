import React from 'react';
import Menu from './menu/Menu';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import MyBlog from './pages/MyBlog';
import Contact from './pages/Contact';
import Header from './headers/Header';
import Register from './pages/Register';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default function () {
  return (
    <Router>
      <div className="App">
        <Menu/>
        <Header title="cham11ng's Blog" subTitle="Informational, Discussion, Inspirational"/>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/my-blog" component={MyBlog}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
      </div>
    </Router>
  );
}
