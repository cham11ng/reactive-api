import '../css/App.css';
import React from 'react';
import Blog from './blogs/Blog';
import EditForm from './blogs/EditForm';
import ArticleForm from './blogs/ArticleForm';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      blog: [
        {
          title: 'You can add your article',
          body: 'Press + to add new article.'
        }
      ],
      editIndex: ''
    };

    this.addArticle = this.addArticle.bind(this);
    this.editArticle = this.editArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.setEditIndex = this.setEditIndex.bind(this);
    this.closeEditForm = this.closeEditForm.bind(this);
  }

  addArticle(article) {
    let blog = this.state.blog.slice();
    blog.push(article);
    this.setState({ blog });
  }

  editArticle(article) {
    let blog = this.state.blog.slice();
    blog[this.state.editIndex] = article;
    this.setState({
      blog: blog,
      editIndex: ''
    });
  }

  deleteArticle(index) {
    let blog = this.state.blog.slice();
    blog = blog.filter((value, i) => i !== index);
    this.setState({ blog });
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
