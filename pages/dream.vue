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
        title: '助けてほしい夢',
        slug: 'dream',
        excerpt: '誰かに手伝ってほしい夢や、成し遂げたいこと、仲間がほしいこと',
        images: [{
          'sizes': {
            'large': {
              'width': 1080,
              'height': 607,
              'source_url': 'https://nishida.lol/wp/wp-content/uploads/2018/03/98C4C165-0F4C-430B-9EE6-2B38158F4B8A.jpeg'
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