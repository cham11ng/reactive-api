import React from 'react';
import '../../css/Article.css';
import Button from '../elements/Button';

class Article extends React.Component {
  render() {
    return (
      <article className="Article content">
        <h2>{this.props.value.title}</h2>
        <p>{this.props.value.body}</p>
        <div className="text-right">
          <Button className="button" value="Edit" onClick={this.props.onEdit}/>
          <Button className="button" value="Delete" onClick={this.props.onDelete}/>
        </div>
      </article>
    );
  }
}

export default Article;
