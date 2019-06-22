/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Sidebar from './components/sidebar';
import Footer from './components/footer';

import '@/css/font-awesome.css';
import '@/scss/layout.scss';

const query = graphql`
  query {
    backgroundImage: file(relativePath: { eq: "background.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default class Layout extends Component {
  static propTypes = {
    children: propTypes.node.isRequired,
  };

  render = () => <StaticQuery query={query} render={this.graphQLRender} />;
  graphQLRender = (data: any) => {
    const { children } = this.props;

    return (
      <>
        <div className="row">
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
        </div>
        {/* {% include js.html %} */}
      </>
    );
  };
}
