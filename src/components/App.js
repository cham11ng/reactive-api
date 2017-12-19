import '../css/App.css';
import React from 'react';
import axios from 'axios';
import Blog from './blogs/Blog';
import EditForm from './blogs/EditForm';
import ArticleForm from './blogs/ArticleForm';

class App extends React.Component {
  constructor() {
    super();

    this.instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 1000,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:8000/'
      }
    });

    this.state = {
      blog: [],
      editIndex: ''
    };

    this.addArticle = this.addArticle.bind(this);
    this.editArticle = this.editArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.setEditIndex = this.setEditIndex.bind(this);
    this.closeEditForm = this.closeEditForm.bind(this);
  }

  componentDidMount() {
    this.instance.get('posts')
      .then(response => {
        this.setState({
          blog: response.data.data
        });
      }).catch(error => {
      console.log(error);
    });
  }

  addArticle(article) {
    let blog = this.state.blog.slice();
    this.instance.post('posts', {
      title: article.title,
      body: article.body,
      tags: [],
      userId: 1
    }).then(response => {
      if (response.status === 201) {
        blog.push(response.data.data);
        this.setState({ blog });
      }
    }).catch(error => console.log(error));
  }

  editArticle(article) {
    let blog = this.state.blog.slice();
    this.instance.put(`posts/${article.id}`, {
      title: article.title,
      body: article.body,
      tags: []
    }).then(response => {
      if (response.status === 200) {
        blog[this.state.editIndex] = article;
        this.setState({
          blog: blog,
          editIndex: ''
        });
      }
    }).catch(error => console.log(error));
  }

  deleteArticle(index) {
    let blog = this.state.blog.slice();
    this.instance.delete(`posts/${blog[index].id}`)
      .then(response => {
        if (response.status === 204) {
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
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title text-center">cham11ng's Blog</h1>
        </header>
        <ArticleForm onSubmit={this.addArticle}/>
        <EditForm value={this.state.blog[this.state.editIndex]}
                  onClose={this.closeEditForm}
                  onSubmit={this.editArticle}/>
        <Blog value={this.state.blog}
              onDelete={this.deleteArticle}
              onEdit={this.setEditIndex}/>
      </div>
    );
  }
}

export default App;
