import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer>
        &copy;{' '}
        <a href="https://github.com/micalgenus" target="_blank">
          Micalgenus
        </a>
        , Made with{' '}
        <a href="https://www.gatsbyjs.org/" target="_blank">
          GatsbyJS
        </a>
      </footer>
    );
  }
}
