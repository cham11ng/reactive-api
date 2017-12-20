import '../css/App.css';
import React from 'react';
import Blog from './blogs/Blog';
import Session from '../utils/Session';
import EditForm from './blogs/EditForm';
import ArticleForm from './blogs/ArticleForm';
import * as HttpStatus from 'http-status-codes';
import { axiosInstance, getTokenHeader } from '../config';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      blog: [],
      editIndex: '',
      isAuthenticated: false
    };

    this.addArticle = this.addArticle.bind(this);
    this.editArticle = this.editArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.setEditIndex = this.setEditIndex.bind(this);
    this.closeEditForm = this.closeEditForm.bind(this);

    this.axiosInstance = Object.assign({}, axiosInstance);

    this.axiosInstance.interceptors.response.use(response => response, (error => {
      if (error.response.status === HttpStatus.UNAUTHORIZED) {
        return this.axiosInstance.post('token', {}, {
          headers: getTokenHeader('refreshToken')
        }).then(response => {
          if (response.status === HttpStatus.OK) {
            let config = Object.assign({}, error.config);
            Session.push('accessToken', response.data['accessToken']);
            config.headers = getTokenHeader('accessToken');
            return this.axiosInstance.request(config).then(response => response).catch(error => error);
          }
        }).catch(error => error);
      }
      return Promise.reject(error);
    }));
  }

  componentDidMount() {
    this.axiosInstance.post('login', {
      email: 'sgr.raee@gmail.com',
      password: 'secret'
    }).then(response => {
      if (response.status === HttpStatus.CREATED) {
        Session.push('accessToken', response.data['accessToken']);
        Session.push('refreshToken', response.data['refreshToken']);
      }
    }).catch(error => error);

    this.axiosInstance.get('posts', {
      headers: getTokenHeader('accessToken')
    }).then(response => {
      if (response.status === HttpStatus.OK) {
        this.setState({
          isAuthenticated: true,
          blog: response.data.data
        });
      }
    }).catch(error => error);
  }

  addArticle(article) {
    let blog = this.state.blog.slice();
    this.axiosInstance.post('posts', {
      title: article.title,
      body: article.body,
      tags: [],
      userId: 1
    }, {
      headers: getTokenHeader('accessToken')
    }).then(response => {
      if (response.status === HttpStatus.CREATED) {
        blog.push(response.data.data);
        this.setState({ blog });
      }
    }).catch(error => console.log(error));
  }

  editArticle(article) {
    let blog = this.state.blog.slice();
    this.axiosInstance.put(`posts/${article.id}`, {
      title: article.title,
      body: article.body,
      tags: []
    }, {
      headers: getTokenHeader('accessToken')
    }).then(response => {
      if (response.status === HttpStatus.OK) {
        blog[this.state.editIndex] = article;
        this.setState({
          blog: blog,
          editIndex: ''
        });
      }
    }).catch(error => error);
  }

  deleteArticle(index) {
    let blog = this.state.blog.slice();
    this.axiosInstance.delete(`posts/${blog[index].id}`, {
      headers: getTokenHeader('accessToken')
    })
      .then(response => {
        if (response.status === HttpStatus.NO_CONTENT) {
          blog = blog.filter((value, i) => i !== index);
          this.setState({ blog });
        }
      }).catch(error => console.log(error));
  }

  setEditIndex(i) {
    this.setState({
      editIndex: i
    });
  }

  closeEditForm() {
    this.setState({
      editIndex: ''
    });
  }

  render() {
    let blog = this.state.isAuthenticated ? (
      (
        <section>
          <ArticleForm onSubmit={this.addArticle}/>
          <EditForm value={this.state.blog[this.state.editIndex]}
                    onClose={this.closeEditForm}
                    onSubmit={this.editArticle}/>
          <Blog value={this.state.blog}
                onDelete={this.deleteArticle}
                onEdit={this.setEditIndex}/>
        </section>
      )
    ) : (
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title text-center">
              Your session was expired.
            </h1>
          </div>
        </div>
      </section>
    );
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title text-center">cham11ng's Blog</h1>
        </header>
        {blog}
      </div>
    );
  }
}

export default App;
