import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';

import { Layout } from '@/containers/layout';
import SEO from '@/components/seo';
import Preview from '@/components/preview';

import { PreviewPost } from '@/components/preview-content';

interface Props extends PageRendererProps {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: PreviewPost;
      }>;
    };
  };
}

const IndexPage = ({ data }: Props) => {
  return (
    <Layout>
      <SEO title="Micalgenus" keywords={[`gatsby`, `application`, `react`]} />
      <Preview posts={data.allMarkdownRemark.edges.map(({ node }) => node)} />
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 10) {
      edges {
        node {
          excerpt(pruneLength: 450)
          frontmatter {
            path
            title
            date(formatString: "MMM DD, YYYY")
          }
        }
      }
    }
  }
`;
