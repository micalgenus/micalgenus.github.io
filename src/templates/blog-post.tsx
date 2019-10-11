import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';
import { Layout } from '@/containers/layout';

import Disqus from 'gatsby-plugin-disqus';

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
        title: string;
        date: string;
      };
    };
  };
  pageContext: {
    isCreatedByStatefulCreatePages: boolean;
    siteUrl: string;
    comments: boolean;
    previous: any;
    next: any;
  };
}

export default ({ data, pageContext, location }: Props) => {
  // useEffect(() => {
  //   ScrollManager.init();
  //   return () => ScrollManager.destroy();
  // }, []);

  const post = data.markdownRemark;
  // const metaData = data.site.siteMetadata;
  // const { title, comment, siteUrl, author, sponsor } = metaData;
  // const { disqusShortName, utterances } = comment;
  let disqusConfig = {
    url: `${pageContext.siteUrl + location.pathname}`,
    identifier: post.id,
    title: post.frontmatter.title,
  };

  console.log(disqusConfig);

  return (
    <Layout>
      <h2>{post.frontmatter.title}</h2>
      <p>{post.frontmatter.date}</p>
      <section dangerouslySetInnerHTML={{ __html: post.html }} />
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
      # id
      # excerpt(pruneLength: 280)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
