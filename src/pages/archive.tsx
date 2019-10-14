import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';

import { Layout } from '@/containers/layout';
import SEO from '@/components/seo';
import { graphql, PageRendererProps } from 'gatsby';

interface PostMeta {
  path: string;
  title: string;
  date: string;
}

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

export default ({ data }: Props) => {
  const posts = data.allMarkdownRemark.edges.map(({ node: { frontmatter: post } }) => post);
  const items: { [year: string]: PostMeta[] } = {};
  for (const post of posts) {
    const year = moment(post.date).format('YYYY');
    items[year] = (items[year] || []).concat(post);
  }

  const years: string[] = Object.keys(items);
  years.sort().reverse();

  return (
    <Layout className="archive">
      <SEO title="Micalgenus" keywords={[`gatsby`, `application`, `react`]} />
      {years.map(year => {
        return (
          <>
            <div className="archive-title">
              <h3>{year}</h3>
            </div>
            <ul>
              {items[year].map(item => {
                return (
                  <li>
                    <span>{moment(item.date).format('MMM DD')}</span>
                    <Link to={item.path}>{item.title}</Link>
                  </li>
                );
              })}
            </ul>
          </>
        );
      })}
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
