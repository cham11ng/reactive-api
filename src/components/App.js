import React from 'react';
import Menu from './menu/Menu';
import Home from './pages/Home';
import About from './pages/About';
import MyBlog from './pages/MyBlog';
import Contact from './pages/Contact';
import Header from './headers/Header';
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
      </div>
    </Router>
  );
}
