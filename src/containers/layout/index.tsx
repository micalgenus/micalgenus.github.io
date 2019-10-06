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
// import Footer from './components/footer';

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
          console.log(data);

          return (
            <>
              <Header siteTitle={data.site.siteMetadata.title} />
              <main>{children}</main>
              {/* <div className="row">
          <div className="col s12 m3">
            <div className="table cover">
              <div className="background-cover" style={{ backgroundImage: `url(${data.backgroundImage.childImageSharp.fluid.src})` }}>
                <div />
              </div>
              <Sidebar />
            </div>
          </div>
          <div className="col s12 m9 progress-container" id="progress-container">
            <div>
              <div className="progress-bar" id="page-status" />
            </div>
          </div>
          <div className="col s12 m9">
            <div className="post-listing" id="post-listing">
              {children}
              <Footer />
            </div>
          </div>
        </div>
        <div className="scroll-position-top" id="scroll-button">
          <a id="to-top">
            <i className="fa fa-angle-up" />
          </a>
          <a id="to-bottom">
            <i className="fa fa-angle-down" />
          </a>
        </div> */}
              {/* {% include js.html %} */}
            </>
          );
        }}
      />
    );
  }
}
