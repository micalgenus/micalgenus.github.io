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
        <div className="header-menu">
        <nav>
          <ul>
            <li className="selected">
              <Link to="/">home</Link>
            </li>
          </ul>
          <ul className="icons">
            <Link to="/">{siteTitle}</Link>
          </ul>
        </nav>
        </div>
        <div>test</div>
      </header>
    );
  }
}
