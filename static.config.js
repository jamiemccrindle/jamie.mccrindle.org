import React, { Component } from 'react'
import path from 'path'
import { renderStaticOptimized } from 'glamor/server'

// Paths Aliases defined through tsconfig.json
const typescriptWebpackPaths = require('./webpack.config.js')

export default {
  entry: path.join(__dirname, 'src', 'index.tsx'),
  siteRoot: 'https://jamie.mccrindle.org',
  // siteRoot: 'http://jamie.mccrindle.org.s3-website-eu-west-1.amazonaws.com',
  getSiteData: () => ({
    title: 'Programming things',
  }),
  inlineCss: true,
  extractCssChunks: true,
  // bundleAnalyzer: true,
  getRoutes: async () => {
    const posts = [
      {
        path: '/posts/anatomy-of-kotlin-unit-test.html',
        component: 'src/posts/201301-AnatomyOfAKotlinUnitTest.tsx',
      },
      {
        path: '/posts/exploring-kotlin-standard-library-part-1',
        component: 'src/posts/201301-ExploringKotlinStandardLibraryPart1.tsx',
      },
      {
        path: '/posts/a-functional-iterate-for-kotlin',
        component: 'src/posts/201301-AFunctionalIterateForKotlin.tsx',
      },
      {
        path: '/posts/exploring-kotlin-standard-library-part-2',
        component: 'src/posts/201301-ExploringKotlinStandardLibraryPart2.tsx',
      },
      {
        path: '/posts/callbacks-poor-mans-yield',
        component: 'src/posts/201301-CallbacksInsteadOfGeneratorsKotlin.tsx',
      },
      {
        path: '/posts/exploring-kotlin-standard-library-part-3',
        component: 'src/posts/201302-ExploringKotlinStandardLibraryPart3.tsx',
      },
      {
        path: '/posts/installing-oracle-java-7-using-chef',
        component: 'src/posts/201307-InstallingOracleJava7UsingChef',
      },
      {
        path: '/posts/jetty-elb-and-x-forwarded-proto',
        component: 'src/posts/201307-JettyTheELBAndXForwardedProto.tsx',
      },
      {
        path: '/posts/docker-ansible-jenkins-and-vagrant',
        component: 'src/posts/201407-DockerAnsibleJenkinsAndVagrant.tsx',
      },
      {
        path: '/posts/dockerception-how-to-have-docker-build',
        component: 'src/posts/201504-DockerceptionHowToHaveADockerBuildYourDockers.tsx',
      },
    ]
    return [
      {
        path: '/',
        component: 'src/containers/Home',
      },
      {
        path: '/blog',
        component: 'src/containers/Blog',
        getData: () => ({
          posts,
        }),
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ].concat(posts.map(post => ({
      path: post.path,
      component: post.component,
    })))
  },
  renderToHtml: async (render, Comp, meta) => {
    const html = render(<Comp />)
    const { css } = renderStaticOptimized(() => html)
    meta.glamStyles = css
    return html
  },
  Document: class CustomDocument extends Component {
    render () {
      const { Html, Head, Body, children, renderMeta } = this.props

      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style dangerouslySetInnerHTML={{ __html: renderMeta.glamStyles }} />
          </Head>
          <Body>
            {children}
          </Body>
        </Html>
      )
    }
  },
  devServer: {
    historyApiFallback: {
      disableDotRule: true,
    },
  },
  webpack: (config, { defaultLoaders }) => {
    // Add .ts and .tsx extension to resolver
    config.resolve.extensions.push('.ts', '.tsx')

    // Add TypeScript Path Mappings (from tsconfig via webpack.config.js)
    // to react-statics alias resolution
    config.resolve.alias = typescriptWebpackPaths.resolve.alias

    // We replace the existing JS rule with one, that allows us to use
    // both TypeScript and JavaScript interchangeably
    config.module.rules = [
      {
        oneOf: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: defaultLoaders.jsLoader.exclude, // as std jsLoader exclude
            use: [
              {
                loader: 'babel-loader',
              },
              {
                loader: require.resolve('ts-loader'),
                options: {
                  transpileOnly: true,
                },
              },
            ],
          },
          defaultLoaders.cssLoader,
          defaultLoaders.fileLoader,
        ],
      },
    ]
    return config
  },
}
