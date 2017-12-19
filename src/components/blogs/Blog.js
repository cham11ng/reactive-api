import React from 'react';
import '../../css/Blog.css';
import Article from './Article';

class Blog extends React.Component {
  render() {
    const articles = this.props.value.map((article, index) => {
      return (
        <Article value={article}
                 key={index}
                 onEdit={() => this.props.onEdit(index)}
                 onDelete={() => this.props.onDelete(index)}/>
      );
    });
    return (
      <section className="Blog">
        {articles}
      </section>
    );
  }
}

export default Blog;
