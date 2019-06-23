import React, { Component } from 'react';

import Avatar from '@micalgenus/gatsby-plugin-github-avatar';

export default class Sidebar extends Component {
  render() {
    return (
      // {% if page.author %} {% assign author = site.data.authors[page.author] %}{% else %}{% assign author = site.owner %} {% endif %}

      <div className="cover-card table-cell table-middle">
        {/* {% if author.avatar %} */}
        <a href="/">
          <Avatar className="avatar" />
        </a>
        {/* {% endif %} */}
        {/* <a href="{{ site.url }}/" class="author_name">{{ author.name }}</a> */}
        {/* <span class="author_job">{{ author.job }}</span> */}
        {/* <span class="author_bio mbm">{{ author.bio }}</span> */}
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="{{ site.url }}/">Home</a>
            </li>
            {/* {% for page in site.pages %} {% if page.title %} */}
            <li className="nav-item">{/* <a href="{{ site.url }}{{ page.url }}">{{ page.title }}</a> */}</li>
            {/* {% endif %} {% endfor %} */}
          </ul>
        </nav>
        {/* {% include social-links.html %} */}
      </div>
    );
  }
}
