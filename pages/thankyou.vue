<template>
  <article-detail :article="article" :post-type="'page'" />
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
        title: '送信完了ページ',
        slug: 'thankyou',
        excerpt: 'お問い合わせありがとうございます。',
        images: [
          {
            sizes: {
              full: {
                width: 1300,
                height: 735,
                source_url:
                  'https://s3-ap-northeast-1.amazonaws.com/nishidalol/wp/wp-content/uploads/2018/01/12045105/IMG_E7622-1200x679.jpg'
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
