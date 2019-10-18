import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';

import { Layout } from '@/containers/layout';
import Content from '@/components/contents';
import SEO from '@/components/seo';

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
        tags: string[];
        title: string;
        date: string;
      };
    };
  };
  pageContext: PageContext;
}

export default ({ data, pageContext, location }: Props) => {
  const post = data.markdownRemark;
  const metaData = data.site.siteMetadata;
  const { siteUrl } = metaData;

  let disqusConfig = {
    url: `${siteUrl + location.pathname}`,
    identifier: post.id,
    title: post.frontmatter.title,
  };

  return (
    <Layout className="post-body" location={location}>
      <SEO title="Micalgenus" keywords={['gatsby', 'application', 'react', ...post.frontmatter.categories, ...post.frontmatter.tags]} />
      <Content
        disqusConfig={disqusConfig}
        pageContext={pageContext}
        postData={{
          title: post.frontmatter.title,
          date: post.frontmatter.date,
          categories: post.frontmatter.categories,
          html: post.html,
        }}
      />
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
      html
      frontmatter {
        categories
        title
        date(formatString: "MMM DD, YYYY")
        tags
      }
    }
  }
`;
