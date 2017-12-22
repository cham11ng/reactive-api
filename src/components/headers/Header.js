import React from 'react';

export default props => (
  <header className="hero is-primary">
    <div className="hero-body">
      <div className="container">
        <h1 className="title">
          {props.title}
        </h1>
        <h2 className="subtitle">
          {props.subTitle}
        </h2>
      </div>
    </div>
  </header>
)
