import React from 'react';
import Article from './Article';

export default props => {
  const articles = props.value.map((article, index) => {
    return (
      <Article value={article}
               key={index}
               onEdit={() => props.onEdit(index)}
               onDelete={() => props.onDelete(index)}/>
    );
  });
  return (
    <section className="content">
      {articles}
    </section>
  );
}
