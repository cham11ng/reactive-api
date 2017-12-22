import React from 'react';
import Button from '../elements/Button';

export default props => (
  <article className="box">
    <div className="content">
      <h2>{props.value.title}</h2>
      <p className="has-text-justified">{props.value.body}</p>
      <div className="field is-grouped">
        <div className="control">
          <Button className="button fa fa-edit" value=" Edit" onClick={props.onEdit}/>
        </div>
        <div className="control">
          <Button className="button fa fa-trash" value=" Delete" onClick={props.onDelete}/>
        </div>
      </div>
    </div>
  </article>
)
