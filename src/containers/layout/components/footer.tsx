import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer>
        &copy; {new Date().getFullYear()} {/*{ site.owner.name }*/ 'Micalgenus'}. Powered by{' '}
        <a href="https://www.gatsbyjs.org" target="_blank">
          Gatsby
        </a>
      </footer>
    );
  }
}
