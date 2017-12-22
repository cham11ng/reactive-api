import React from 'react';
import Button from '../elements/Button';

export default props => (
  <article className="box">
    <div className="content">
      <h2>{props.value.title}</h2>
      <p className="has-text-justified">{props.value.body}</p>
      <div className="has-text-right">
        <Button className="button fa fa-edit" value=" Edit" onClick={props.onEdit}/>
        <Button className="button fa fa-trash" value=" Delete" onClick={props.onDelete}/>
      </div>
    </div>
  </article>
)
