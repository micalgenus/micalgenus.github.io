import React, { Component } from 'react';
import { Link } from 'gatsby';

interface Props {
  siteTitle: string;
}

export default class Header extends Component<Props> {
  render() {
    const { siteTitle } = this.props;

    return (
      <header>
        <div>
          <h1>
            <Link to="/">{siteTitle}</Link>
          </h1>
        </div>
      </header>
    );
  }
}
