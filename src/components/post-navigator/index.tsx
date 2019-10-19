import React from 'react';
import { Link } from 'gatsby';

import { PageContext } from '@/templates/blog-post';

import './index.css';

interface Props {
  pageContext: PageContext;
}

export const PostNavigator = ({ pageContext }: Props) => {
  const { previous, next } = pageContext;

  return (
    <ul className="navigator">
      <li>
        {previous && (
          <Link to={previous.frontmatter.path} rel="prev">
            <b>←</b>
            <span>{previous.frontmatter.title}</span>
            <p>이전 글</p>
          </Link>
        )}
      </li>
      <li>
        {next && (
          <Link to={next.frontmatter.path} rel="next">
            <span>{next.frontmatter.title}</span>
            <p>다음 글</p>
            <b>→</b>
          </Link>
        )}
      </li>
    </ul>
  );
};
