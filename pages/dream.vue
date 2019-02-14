<template>
  <ArticleDetail :article="article" :postType="'page'" />
</template>

<script>
import ArticleDetail from '~/components/ArticleDetail'

export default {
  components: {
    ArticleDetail
  },

  data() {
    return {
      article: {
        title: '助けてほしい夢',
        slug: 'dream',
        excerpt: '誰かに手伝ってほしい夢や、成し遂げたいこと、仲間がほしいこと',
        images: [
          {
            sizes: {
              full: {
                width: 1060,
                height: 596,
                source_url:
                  'https://s3-ap-northeast-1.amazonaws.com/nishidalol/wp/wp-content/uploads/2018/03/19194517/98C4C165-0F4C-430B-9EE6-2B38158F4B8A-e1526726717829.jpeg'
              }
            }
          }
        ]
      }
    }
  },

  computed: {},

  head() {
    return {
      title: `${this.article.title} | ${this.$store.state.meta.name}`,
      meta: [
        {
          description: this.article.excerpt
        }
      ]
    }
  }
}
</script>
