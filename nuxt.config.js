const axios = require('axios')
const apiUrl = 'https://admin.nishida.lol'

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '家族でどう楽しく生きるか模索する、にしだけ夫婦ブログ',
    titleTemplate: '%s - にしだけ夫婦ブログ',
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'description',
        content: 'にしだけ夫婦がオーストラリアでのバンライフ（車中泊）生活や、旅やリモートワークなどを通じて、楽しく生きるためのいろんな価値観を模索していくブログです。',
        hid: 'description'
      },
      { name: 'google-site-verification', content: 'XGQ71tOVna37NmkZkbVjdcnKvS8q8-H0khYZ3koGuo4' },
      { name: 'application-name', content: 'にしだけ夫婦ブログ' },

      // Google
      { name: 'theme-color', content: '#fff200' },

      // twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@nishidalol' },

      // Facebook
      // { property: 'fb:app_id', content: '' },
      {
        property: 'og:title',
        content: '家族でどう楽しく生きるか模索する、にしだけ夫婦ブログ',
        hid: 'ogTitle'
      },
      { property: 'og:site_name', content: 'にしだけ夫婦ブログ' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://nishida.lol', hid: 'ogUrl' },
      { property: 'og:locale', content: 'ja_JP' },
      { property: 'og:image', content: 'https://nishida.lol/ogp.jpg', hid: 'ogImage' },
      {
        property: 'og:description',
        content: 'にしだけ夫婦がオーストラリアでのバンライフ（車中泊）生活や、旅やリモートワークなどを通じて、楽しく生きるためのいろんな価値観を模索していくブログです。',
        hid: 'ogDesc'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-touch-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-touch-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-touch-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-touch-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-touch-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-touch-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-touch-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-touch-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon-180x180.png' },
      { rel: 'mask-icon', color: '#1c2260', href: '/website_icon.svg' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon-48x48.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '160x160', href: '/favicon-160x160.png' },
      { rel: 'icon', type: 'image/png', sizes: '196x196', href: '/favicon-196x196.png' },
      { rel: 'alternate', type: 'application/rss+xml', href: '/feed.xml' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/earlyaccess/roundedmplus1c.css' }
    ]
  },

  css: [
    'normalize.css/normalize.css',
    '~/assets/style/app.styl'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#fff' },
  /*
  ** Build configuration
  */
  build: {
    babel: {
    },
    vendor: [
      'moment'
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  generate: {
    interval: 1000,
    routes () {
      return Promise.all([
        axios.get(`${apiUrl}/wp-json/wp/v2/posts?per_page=100&page=1&_embed=1`),
        axios.get(`${apiUrl}/wp-json/wp/v2/pages?per_page=100&page=1&_embed=1`),
        axios.get(`${apiUrl}/wp-json/wp/v2/categories?per_page=100`)
      ]).then((data) => {
        const posts = data[0]
        const pages = data[1]
        const categories = data[2]
        return posts.data.map((post) => {
          return {
            route: '/post/' + post.slug,
            payload: post
          }
        }).concat(pages.data.map((page) => {
          return {
            route: page.slug,
            payload: page
          }
        })).concat(categories.data.map((category) => {
          return {
            route: `/category/${category.slug}`,
            payload: categories
          }
        }))
      })
    }
  },
  plugins: [
    { src: '~plugins/vue-lazyload', ssr: false },
    { src: '~plugins/mixins' }
  ],
  modules: [
    '@nuxtjs/axios',
    ['@nuxtjs/google-analytics', {
      id: 'UA-91570631-1'
    }],
    ['~/modules/api', {
      'config': '~/api.config.js',
      'baseURI': `${apiUrl}/wp-json`
    }]
  ]
}
