import React from 'react';
import moment from 'moment';

import { Layout } from '@/containers/layout';
import SEO from '@/components/seo';
import Archive from '@/components/archive';
import { graphql, PageRendererProps } from 'gatsby';
import { PostMeta } from '@/components/archive-content';

type PostMetadata = Pick<PostMeta, 'path' | 'title' | 'date'>;
interface Props extends PageRendererProps {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: {
          frontmatter: PostMetadata;
        };
      }>;
    };
  };
}

export default ({ data, location }: Props) => {
  const posts = data.allMarkdownRemark.edges.map(({ node: { frontmatter: post } }) => post);
  const items: { [year: string]: PostMetadata[] } = {};
  for (const post of posts) {
    const year = moment(post.date).format('YYYY');
    items[year] = (items[year] || []).concat(post);
  }

  const years: string[] = Object.keys(items);
  years.sort().reverse();

  return (
    <Layout className="archive" location={location}>
      <SEO title="Micalgenus" keywords={[`gatsby`, `application`, `react`]} />
      {years.map(year => (
        <Archive key={year} title={year} items={items[year]} />
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
          }
        }
      }
    }
  }
`;
