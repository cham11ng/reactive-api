import React from 'react';
import Button from '../elements/Button';

export default props => (
  <div className={props.isActive ? 'modal is-active' : 'modal'}>
    <div className="modal-background"/>
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">{props.title}</p>
        <Button className="delete"
                onClick={() => props.onClose()}/>
      </header>
      <form onSubmit={props.handleSubmit}>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input value={props.value.title} className="input" type="text"
                     placeholder="Title" name="title"
                     onChange={props.onChange}/>
            </div>
          </div>

          <div className="field">
            <label className="label">Description</label>
            <div className="control">
                <textarea value={props.value.body} className="textarea"
                          placeholder="Body" name="body"
                          onChange={props.onChange}/>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <Button className="button is-success" value="Save changes"/>
        </footer>
      </form>
    </div>
    <Button className="modal-close is-large" onClick={() => props.onClose()}/>
  </div>
)
