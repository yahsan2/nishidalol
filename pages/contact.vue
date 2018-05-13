<template>
  <ArticleDetail
    :article="article"
    :postType="'contact'"
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
        excerpt: 'WEB のクリエイティブや、コミュニティー運営・組織づくり、オンラインの業務改善などのお仕事依頼'
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