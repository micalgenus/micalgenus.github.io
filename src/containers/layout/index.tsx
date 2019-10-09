/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Header from './components/header';
// import Sidebar from './components/sidebar';
import Footer from './components/footer';

import '@/css/font-awesome.css';
import '@/scss/layout.scss';

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

export default class Layout extends Component {
  static propTypes = {
    children: propTypes.node.isRequired,
  };

  render() {
    return (
      <StaticQuery
        query={query}
        render={data => {
          const { children } = this.props;

          return (
            <>
              <Header siteTitle={data.site.siteMetadata.title} />
              <main>{children}</main>
              <Footer />
            </>
          );
        }}
      />
    );
  }
}
