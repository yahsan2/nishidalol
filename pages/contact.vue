<template>
  <ArticleDetail
    :article="article"
    :postType="'page'"
  />
</template>

<script>
import ArticleDetail from '~/components/ArticleDetail'

export default {
  async asyncData ({ app, store, params, route, payload }) {
  },

  data () {
    return {
      article: {
        title: 'お仕事依頼',
        slug: 'contact',
        excerpt: 'WEB クリエイティブ / コミュニティーづくり・運営 / オンラインの業務改善',
        images: [{
          'sizes': {
            'large': {
              'width': 1300,
              'height': 735,
              'source_url': 'https://s3-ap-northeast-1.amazonaws.com/nishidalol/wp/wp-content/uploads/2018/01/12045105/IMG_E7622-1200x679.jpg'
            }
          }
        }]
      }

    }
  },

  components: {
    ArticleDetail
  },

  computed: {
  },

  head () {
    return {
      title: `${this.article.title} | ${this.$store.state.meta.name}`,
      meta: [
        { description: this.article.excerpt }
      ]
    }
  }
}
</script>