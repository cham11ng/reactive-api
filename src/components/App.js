import React from 'react';

import Blog from './blogs/Blog';
import Header from './headers/Header';
import Button from './elements/Button';
import Message from './elements/Message';
import ArticleForm from './blogs/ArticleForm';
import * as authService from '../services/authService';
import * as articleService from '../services/articleService';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      blog: [],
      form: {
        title: '',
        body: ''
      },
      isAddModal: false,
      editIndex: null,
      isEditing: false,
      isAuthenticated: false
    };

    this.addArticle = this.addArticle.bind(this);
    this.editArticle = this.editArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.fetchAllArticle = this.fetchAllArticle.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.toggleAddForm = this.toggleAddForm.bind(this);
    this.toggleEditForm = this.toggleEditForm.bind(this);
  }

  componentDidMount() {
    authService.login().then(response => {
      this.fetchAllArticle();
      this.setState({
        isAuthenticated: true
      });
    }).catch(error => error);
  }

  fetchAllArticle() {
    articleService.fetchAll().then(response => {
      this.setState({ blog: response.data });
    }).then(error => error);
  }

  addArticle(event) {
    event.preventDefault();
    articleService.add(this.state.form).then(response => {
      if (response) {
        let blog = [...this.state.blog];
        blog.push(response.data);
        this.setState({
          blog: blog,
          isAddModal: !this.state.isAddModal,
          isEditing: false,
          form: {
            title: '',
            body: ''
          }
        });
      }
    }).then(error => error);
  }

  editArticle(event) {
    event.preventDefault();
    articleService.edit(this.state.form).then(response => {
      if (response) {
        let blog = [...this.state.blog];
        blog[this.state.editIndex] = response.data;
        this.setState({
          blog: blog,
          editIndex: null,
          isEditing: false,
          form: {
            title: '',
            body: ''
          }
        });
      }
    }).catch(error => error);
  }

  deleteArticle(index) {
    articleService.remove(this.state.blog[index].id).then(response => {
      if (response) {
        let blog = [...this.state.blog];
        blog.splice(index, 1);
        this.setState({ blog });
      }
    }).catch(error => error);
  }

  toggleAddForm() {
    return this.setState({
      isAddModal: !this.state.isAddModal,
      isEditing: false,
      form: {
        title: '',
        body: ''
      }
    });
  }

  toggleEditForm(index = null) {
    return this.setState({
      isEditing: false,
      editIndex: index,
      form: (index !== null) ? this.state.blog[index] : {
        title: '',
        body: '',
      }
    });
  }

  handleChange(event) {
    let article = { ...this.state.form };
    article[event.target.name] = event.target.value;

    return this.setState({
      form: article,
      isEditing: true
    });
  }

  render() {
    let message = <Message value=":( Your session was expired."/>;

    let blog = (
      <div className="container">
        <div className="content has-text-right">
          <Button value=" Add Article"
                  className="button fa fa-plus"
                  onClick={this.toggleAddForm}/>
        </div>
        <ArticleForm title="Add Article"
                     isActive={this.state.isAddModal}
                     value={this.state.form}
                     onClose={this.toggleAddForm}
                     onChange={this.handleChange}
                     handleSubmit={this.addArticle}/>
        <ArticleForm title="Edit Article"
                     isActive={this.state.editIndex !== null}
                     value={this.state.isEditing
                       ? this.state.form
                       : this.state.blog[this.state.editIndex] || this.state.form}
                     onClose={this.toggleEditForm}
                     onChange={this.handleChange}
                     handleSubmit={this.editArticle}/>
        <Blog value={this.state.blog}
              onDelete={this.deleteArticle}
              onEdit={this.toggleEditForm}/>
      </div>
    );

    return (
      <div className="App">
        <Header title="cham11ng's Blog" subTitle="Informational, Discussion, Inspirational"/>
        <section className="section">
          {this.state.isAuthenticated ? blog : message}
        </section>
      </div>
    );
  }
}

export default App;
