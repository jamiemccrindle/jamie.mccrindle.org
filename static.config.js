import path from 'path'

// Paths Aliases defined through tsconfig.json
const typescriptWebpackPaths = require('./webpack.config.js')

export default {
  entry: path.join(__dirname, 'src', 'index.tsx'),
  // siteRoot: 'https://jamie.mccrindle.org',
  siteRoot: 'http://jamie.mccrindle.org.s3-website-eu-west-1.amazonaws.com',
  getSiteData: () => ({
    title: 'Programming things',
  }),
  inlineCss: true,
  extractCssChunks: true,
  getRoutes: async () => {
    const posts = [
      {
        path: '/2013/01/anatomy-of-kotlin-unit-test.html',
        component: 'src/posts/201301-AnatomyOfAKotlinUnitTest.tsx',
      },
      {
        path: '/2013/01/exploring-kotlin-standard-library-part-1.html',
        component: 'src/posts/201301-ExploringKotlinStandardLibraryPart1.tsx',
      },
      {
        path: '/2013/01/a-functional-iterate-for-kotlin.html',
        component: 'src/posts/201301-AFunctionalIterateForKotlin.tsx',
      },
      {
        path: '/2013/01/exploring-kotlin-standard-library-part-2.html',
        component: 'src/posts/201301-ExploringKotlinStandardLibraryPart2.tsx',
      },
      {
        path: '/2013/01/callbacks-poor-mans-yield.html',
        component: 'src/posts/201301-CallbacksInsteadOfGeneratorsKotlin.tsx',
      },
      {
        path: '/2013/02/exploring-kotlin-standard-library-part-3.html',
        component: 'src/posts/201302-ExploringKotlinStandardLibraryPart3.tsx',
      },
      {
        path: '/2013/07/installing-oracle-java-7-using-chef.html',
        component: 'src/posts/201307-InstallingOracleJava7UsingChef',
      },
      {
        path: '/2013/07/jetty-elb-and-x-forwarded-proto.html',
        component: 'src/posts/201307-JettyTheELBAndXForwardedProto.tsx',
      },
      {
        path: '/2014/07/docker-ansible-jenkins-and-vagrant.html',
        component: 'src/posts/201407-DockerAnsibleJenkinsAndVagrant.tsx',
      },
      {
        path: '/2015/04/dockerception-how-to-have-docker-build.html',
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
