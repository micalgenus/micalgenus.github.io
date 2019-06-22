module.exports = {
  siteMetadata: {
    title: `GyeongSu Han's Github Pages`,
    description: `Full-Stack developer using node.js`,
    author: `@micalgenus`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#8d7edc`,
        theme_color: `#8d7edc`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-112022122-3',
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `micalgenus-blog`,
      },
    },
    {
      resolve: `gatsby-plugin-github-avatar`,
      options: {
        username: `micalgenus`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
