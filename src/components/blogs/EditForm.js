import React from 'react';
import Button from '../elements/Button';

class EditForm extends React.Component {
  constructor() {
    super();

    this.state = {
      isEditing: false,
      article: {
        title: '',
        body: ''
      }
    };

    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let article = Object.assign({}, this.state.article);
    article[event.target.name] = event.target.value;

    return this.setState({ article });
  }

  closeModal() {
    this.props.onClose();
    this.setState({
      isEditing: false
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.article);
    this.setState({
      isEditing: false
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      this.setState({
        isEditing: true,
        article: nextProps.value
      });
    }
  }

  render() {
    const { article } = this.state;

    return (
      <div className={`modal${ this.state.isEditing ? ' is-active' : ''}`}>
        <div className="modal-background"/>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Edit Article</p>
            <Button className="delete"
                    onClick={this.closeModal}/>
          </header>
          <form onSubmit={this.handleSubmit}>
            <section className="modal-card-body">
              <div className="field">
                <label className="label">Title</label>
                <div className="control">
                  <input value={article.title} className="input" type="text"
                         placeholder="Title" name="title"
                         onChange={this.handleChange}/>
                </div>
              </div>

              <div className="field">
                <label className="label">Message</label>
                <div className="control">
                    <textarea value={article.body} className="textarea"
                              placeholder="Body" name="body"
                              onChange={this.handleChange}/>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <Button className="button is-success"
                      value="Save changes"/>
            </footer>
          </form>
        </div>
        <Button className="modal-close is-large" aria-label="close"
                onClick={this.closeModal}/>
      </div>
    );
  }
}

export default EditForm;
