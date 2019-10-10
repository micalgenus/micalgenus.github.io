import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';
import { Layout } from '@/containers/layout';

// import * as Elements from '../components/elements';
// import { Layout } from '../layout';
// import { Head } from '../components/head';
// import { PostTitle } from '../components/post-title';
// import { PostContainer } from '../components/post-container';
// import { SocialShare } from '../components/social-share';
// import { SponsorButton } from '../components/sponsor-button';
// import { Bio } from '../components/bio';
// import { PostNavigator } from '../components/post-navigator';
// import { Disqus } from '../components/disqus';
// import { Utterences } from '../components/utterances';
// import * as ScrollManager from '../utils/scroll';

// import '../styles/code.scss';
interface Props extends PageRendererProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
        author: string;
        siteUrl: string;
      };
    };
    markdownRemark: {
      id: string;
      html: string;
      frontmatter: {
        title: string;
        date: string;
      };
    };
  };
  pageContext: {
    isCreatedByStatefulCreatePages: boolean;
    comments: boolean;
    previous: any;
    next: any;
  };
}

export default ({ data, pageContext, location }: Props) => {
  // useEffect(() => {
  //   ScrollManager.init();
  //   return () => ScrollManager.destroy();
  // }, []);

  // const post = data.markdownRemark;
  // const metaData = data.site.siteMetadata;
  // const { title, comment, siteUrl, author, sponsor } = metaData;
  // const { disqusShortName, utterances } = comment;

  return (
    <Layout location={location}>
      <div>{JSON.stringify(data)}</div>
      <div>{JSON.stringify(pageContext)}</div>
      {/* <Head title={post.frontmatter.title} description={post.excerpt} />
      <PostTitle title={post.frontmatter.title} />
      <PostContainer html={post.html} />
      <SocialShare title={post.frontmatter.title} author={author} />
      {!!sponsor.buyMeACoffeeId && <SponsorButton sponsorId={sponsor.buyMeACoffeeId} />}
      <Elements.Hr />
      <Bio />
      <PostNavigator pageContext={pageContext} />
      {!!disqusShortName && <Disqus post={post} shortName={disqusShortName} siteUrl={siteUrl} slug={pageContext.slug} />}
      {!!utterances && <Utterences repo={utterances} />} */}
    </Layout>
  );
};

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      # id
      # excerpt(pruneLength: 280)
      html
      frontmatter {
        title
        date(fromNow: true)
      }
    }
  }
`;
