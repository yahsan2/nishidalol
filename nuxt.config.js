const axios = require('axios')
const apiUrl = 'https://nishida.lol'

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '家族でどう楽しく生きるか模索する、にしだけ夫婦ブログ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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
      id: 'UA-XXXX-XXX'
    }],
    ['~/modules/api', {
      'config': '~/api.config.js',
      'baseURI': `${apiUrl}/wp-json`
    }]
  ]
}
