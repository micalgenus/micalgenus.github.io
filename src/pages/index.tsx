import React from 'react';
import { PageRendererProps } from 'gatsby';
// import { Link } from 'gatsby';

import { Layout } from '@/containers/layout';
import SEO from '@/components/seo';
// import Disqus from 'gatsby-plugin-disqus';

const IndexPage = ({ location }: PageRendererProps) => (
  <Layout>
    {console.log(location)}
    <SEO title="Micalgenus" keywords={[`gatsby`, `application`, `react`]} />
    <section></section>
  </Layout>
);

export default IndexPage;
