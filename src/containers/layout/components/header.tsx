import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '@micalgenus/gatsby-plugin-github-avatar';
import { Link } from 'gatsby';
import React, { Component } from 'react';

interface Props {
  siteTitle: string;
  location?: string;
}

export default class Header extends Component<Props> {
  render() {
    const { siteTitle, location } = this.props;
    const [, path] = (location || '/').split('/');

    return (
      <header>
        <div className="header-menu">
          <nav>
            <ul>
              <li className={path === '' ? 'selected' : ''}>
                <Link to="/">home</Link>
              </li>
              <li className={path === 'archive' ? 'selected' : ''}>
                <Link to="/archive">archive</Link>
              </li>
              <li className={path === 'categories' ? 'selected' : ''}>
                <Link to="/categories">categories</Link>
              </li>
              {/* <li>
                <Link to="/tags">tags</Link>
              </li> */}
            </ul>
            <ul className="icons">
              <li>
                <a href="mailto:micalgenus@gmail.com">
                  <FontAwesomeIcon icon={faEnvelope} />
                </a>
              </li>
              <li>
                <a href="http://linkedin.com/in/gyeong-su-han" target="_blank">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </li>
              <li>
                <a href="http://github.com/micalgenus" target="_blank">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </li>
              {/* <li>
                <a href="https://portfolio.micalgenus.com/" target="_blank">
                  <FontAwesomeIcon icon={faPortrait} />
                </a>
              </li> */}
              {/* <li>
                <a className="search-btn">
                  <FontAwesomeIcon icon={faSearch} />
                </a>
              </li> */}
            </ul>
          </nav>
        </div>

        <div className="profile">
          <Avatar />
          <p>{siteTitle}</p>
        </div>
      </header>
    );
  }
}
