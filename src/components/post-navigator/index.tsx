import React from 'react';
import { Link } from 'gatsby';

import { PageContext } from '@/templates/blog-post';

import './index.css';

interface Props {
  pageContext: PageContext;
}

export const PostNavigator = ({ pageContext }: Props) => {
  const { previous, next } = pageContext;

  console.log(previous);

  return (
    <ul className="navigator">
      <li>
        {previous && (
          <Link to={previous.frontmatter.path} rel="prev">
            ← {previous.frontmatter.title}
          </Link>
        )}
      </li>
      <li>
        {next && (
          <Link to={next.frontmatter.path} rel="next">
            {next.frontmatter.title} →
          </Link>
        )}
      </li>
    </ul>
  );
};
