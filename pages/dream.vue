<template>
  <ArticleDetail
    :article="article"
    :postType="'dream'"
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
        title: '助けてほしい夢',
        slug: 'dream',
        excerpt: '誰かに手伝ってほしい夢や、成し遂げたいこと、仲間がほしいこと'
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