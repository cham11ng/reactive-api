import React from 'react';
import Button from '../elements/Button';

class ArticleForm extends React.Component {
  constructor() {
    super();

    this.state = {
      isActive: false,
      article: {
        title: '',
        body: ''
      }
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    let article = Object.assign({}, this.state.article);
    article[event.target.name] = event.target.value;

    return this.setState({ article });
  }

  handleClick(event, type) {
    event.preventDefault();

    return this.setState({ isActive: type === 'open' });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.article);
    this.setState({
      isActive: false,
      article: {
        title: '',
        body: ''
      }
    });
  }

  render() {
    let isActive = `modal${this.state.isActive ? ' is-active' : ''}`;
    const { article } = this.state;
    return (
      <div className="AppForm">
        <div className="text-center">
          <Button className="button fa fa-plus"
                  onClick={(event) => this.handleClick(event, 'open')}/>
        </div>
        <div className={isActive}>
          <div className="modal-background"/>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Add Article</p>
              <Button className="delete"
                      onClick={(event) => this.handleClick(event, 'close')}/>
            </header>
            <form onSubmit={this.handleSubmit}>
              <section className="modal-card-body">
                <div className="field">
                  <label className="label">Title</label>
                  <div className="control">
                    <input value={article.title} className="input" type="text" placeholder="Title" name="title"
                           onChange={this.handleChange}/>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Message</label>
                  <div className="control">
                    <textarea value={article.body} className="textarea" placeholder="Body" name="body"
                              onChange={this.handleChange}/>
                  </div>
                </div>
              </section>
              <footer className="modal-card-foot">
                <Button className="button is-success"
                        value="Save changes"/>
                <Button className="button"
                        value="Close"
                        onClick={(event) => this.handleClick(event, 'close')}/>
              </footer>
            </form>
          </div>
          <Button className="modal-close is-large" aria-label="close"
                  onClick={(event) => this.handleClick(event, 'close')}/>
        </div>
      </div>
    );
  }
}

export default ArticleForm;
