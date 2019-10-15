import React from 'react';
import Disqus from 'gatsby-plugin-disqus';

import { PostNavigator } from '@/components/post-navigator';
import { PageContext } from '@/templates/blog-post';

interface Props {
  disqusConfig: {
    url: string;
    identifier: string;
    title: string;
  };
  postData: {
    title: string;
    date: string;
    categories: string[];
    html: string;
  };
  pageContext: PageContext;
}

export default ({ disqusConfig, postData: { title, date, categories, html }, pageContext }: Props) => {
  return (
    <>
      <h2>{title}</h2>
      <p>
        {date} <b>&middot;</b> <span>{categories.join(', ')}</span>
      </p>
      <section dangerouslySetInnerHTML={{ __html: html }} />
      <PostNavigator pageContext={pageContext} />
      {pageContext.comments && <Disqus config={disqusConfig} />}
    </>
  );
};
