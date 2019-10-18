import React from 'react';

import { Layout } from '@/containers/layout';
import SEO from '@/components/seo';
import Archive from '@/components/archive';
import { graphql, PageRendererProps } from 'gatsby';
import { PostMeta } from '@/components/archive-content';

interface Props extends PageRendererProps {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: {
          frontmatter: PostMeta;
        };
      }>;
    };
  };
}

export default ({ data, location }: Props) => {
  const posts = data.allMarkdownRemark.edges.map(({ node: { frontmatter: post } }) => post);
  const items: { [category: string]: PostMeta[] } = {};
  for (const post of posts) {
    const { categories } = post;
    for (const category of categories) {
      items[category] = (items[category] || []).concat(post);
    }
  }

  const categories: string[] = Object.entries(items)
    .sort(([, { length: a }], [, { length: b }]) => b - a)
    .map(([category]) => category);

  return (
    <Layout className="categories" location={location}>
      <SEO title="Micalgenus" keywords={[`gatsby`, `application`, `react`]} />
      {categories.map(category => (
        <Archive key={category} title={category} items={items[category]} momentFormat="MMM DD, YYYY" />
      ))}
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            path
            title
            date
            categories
          }
        }
      }
    }
  }
`;
