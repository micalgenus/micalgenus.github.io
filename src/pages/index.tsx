import React from 'react';
import { Link } from 'gatsby';

import Layout from '@/containers/layout';
import SEO from '@/components/seo';
import Disqus from 'gatsby-plugin-disqus';

const IndexPage = () => (
  <Layout>
    <SEO title="Micalgenus" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link>
    {/*% for post in site.posts limit: 5 %*/}
    <section className="post">
      <header className="post-header">
        <p className="post-meta">
          <span className="post-date">{/* {{ post.date | date: "%-d %b %Y" | upcase }} */}</span>
          {/*% if post.categories.size > 0 %*/}•{/*% for cat in post.categories %*/}
          {/* <a className="post-cat" href="{{ site.url }}/categories/#{{ cat }}">{{ cat }}</a> */}
          {/*% unless forloop.last %*/}
          <span>/</span>
          {/*% endunless %*/}
          {/*% endfor %*/}
          {/*% endif %*/}
        </p>
        <h4>
          {/* <a href="{{ site.url }}{{ post.url }}" class="post-title" title="{{ post.title | escape }}">{{ post.title }}</a> */}
          {/*% if post.link %*/}
          <a className="post-title-link" href="{{ post.link }}" target="_blank" title="{{ post.title | escape }}">
            <i className="fa fa-external-link" />
          </a>
          {/*% endif %*/}
        </h4>

        {/*% if post.author %*/}
        {/*% assign author = site.data.authors[post.author] %*/}
        {/*% else %*/}
        {/*% assign author = site.owner %*/}
        {/*% endif %*/}
      </header>

      {/*% if post.excerpt %*/}
      <div className="post-description">
        <p>{/* {{ post.excerpt }} */}</p>
      </div>
      {/*% endif %*/}

      {/*% if post.image.feature %*/}
      <div className="post-image-feature">
        <img
          src={
            /*% if post.image.feature contains 'http' %}
      "{{ post.image.feature }}"
      {% else %}
      "{{ site.url }}/img/{{ post.image.feature }}"
      {/*% endif %*/
            ''
          }
          alt="{{ post.title | escape }} feature image"
        />

        <Disqus identifier={'100'} title={'micalgenus'} url={`https://micalgenus.github.io/${location.pathname}`} />

        {/*% if post.image.credit %*/}
        {/* <span class="image-credit">Photo Credit: <a href="{{ post.image.creditlink }}">{{ post.image.credit }}</a></span> */}
        {/*% endif %*/}
      </div>
      {/* <!-- /.image-wrap --> */}
      {/*% endif %*/}
    </section>
    {/*% endfor %*/}
  </Layout>
);

export default IndexPage;
