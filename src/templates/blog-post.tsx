import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';
import Disqus from 'gatsby-plugin-disqus';

import { Layout } from '@/containers/layout';
import { PostNavigator } from '@/components/post-navigator';

export interface PageContext {
  isCreatedByStatefulCreatePages: boolean;
  siteUrl: string;
  comments: boolean;
  previous: any;
  next: any;
}

interface Props extends PageRendererProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
        author: string;
        siteUrl: string;
      };
    };
    markdownRemark: {
      id: string;
      html: string;
      frontmatter: {
        categories: string[];
        title: string;
        date: string;
      };
    };
  };
  pageContext: PageContext;
}

export default ({ data, pageContext, location }: Props) => {
  // useEffect(() => {
  //   ScrollManager.init();
  //   return () => ScrollManager.destroy();
  // }, []);

  const post = data.markdownRemark;
  const metaData = data.site.siteMetadata;
  const { siteUrl } = metaData;

  let disqusConfig = {
    url: `${siteUrl + location.pathname}`,
    identifier: post.id,
    title: post.frontmatter.title,
  };

  return (
    <Layout>
      <h2>{post.frontmatter.title}</h2>
      <p>
        {post.frontmatter.date} <b>&middot;</b> <span>{post.frontmatter.categories.join(', ')}</span>
      </p>
      <section dangerouslySetInnerHTML={{ __html: post.html }} />
      <PostNavigator pageContext={pageContext} />
      {pageContext.comments && <Disqus config={disqusConfig} />}
    </Layout>
  );
};

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      # excerpt(pruneLength: 280)
      html
      frontmatter {
        categories
        title
        date(formatString: "MMM DD, YYYY")
      }
    }
  }
`;
