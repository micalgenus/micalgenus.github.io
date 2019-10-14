/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { StaticQuery, graphql, PageRendererProps } from 'gatsby';

import Header from './components/header';
// import Sidebar from './components/sidebar';
import Footer from './components/footer';

import '@/css/font-awesome.css';
import './css/layout.css';

const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

interface Props extends Partial<PageRendererProps> {
  className?: string;
}

export class Layout extends Component<Props> {
  static propTypes = {
    children: propTypes.node.isRequired,
  };

  render() {
    return (
      <StaticQuery
        query={query}
        render={data => {
          const { children, className } = this.props;

          return (
            <>
              <Header siteTitle={data.site.siteMetadata.title} />
              <main className={className}>{children}</main>
              <Footer />
            </>
          );
        }}
      />
    );
  }
}
