import React from 'react';

export default function (props) {
  return (
    <div className="container">
      <div className="box">
        <div className="content">
          <h4 className="has-text-centered">{props.value}</h4>
        </div>
      </div>
    </div>
  );
}
