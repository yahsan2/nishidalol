<template>
  <ArticleDetail
    :article="article"
    :postType="'thankyou'"
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
        title: '送信完了ページ',
        excerpt: 'お問い合わせありがとうございます。'
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