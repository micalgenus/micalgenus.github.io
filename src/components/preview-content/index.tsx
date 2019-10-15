import React from 'react';
import { PostMeta } from '../archive-content';
import { Link } from 'gatsby';

import './index.css';

export interface PreviewPost {
  excerpt: string;
  frontmatter: PostMeta;
}

export default ({ excerpt, frontmatter: { title, date, path } }: PreviewPost) => {
  return (
    <li className="preview">
      <Link to={path}>
        <h3>{title}</h3>
        <span>{date}</span>
        <p>{excerpt}</p>
      </Link>
    </li>
  );
};
