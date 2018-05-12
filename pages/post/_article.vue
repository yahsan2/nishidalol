<template>
  <article class="single article-container section" :class="categorySlugs">
    <transition name="slide-fade">
      <div class="article-body typeset" :class="{ 'no-featured-image': !featuredImage }">
        <header class="article-header">
          <h1 class="article-title" v-html="article.title"></h1>
          <ArticleFeaturedImage
            v-if="featuredImage"
            :featured-image="featuredImage"
          />
          <p class="article-meta">
            <span>{{ longTimestamp(article.date) }}</span>
            <span class="separator">|</span>
            <!-- <nuxt-link class="author fancy" :to="`/authors/${author.slug}`"></nuxt-link> -->
            <span>{{ author.name }}</span>
            <span class="separator">|</span>
            <span class="categories">
              <nuxt-link class="term" v-for="term in article.terms[0]" :to="`/category/${term.slug}`" :key="term.id" v-html="term.name" v-if="article.terms && article.terms[0]"></nuxt-link>
            </span>
          </p>
        </header>
        <section v-html="article.content" class="article-main section"></section>
        <footer class="section">
          shere いれるよ〜
        </footer>
        <!-- <ArticleComments :article="article"/> -->
      </div>
    </transition>
  </article>
</template>

<style lang="stylus" scoped>
@import '~assets/style/settings'

.article-container
  position relative
  padding 0 $column-gap $section-gap * 2
  &:before
    position absolute
    top 0
    left 0
    width 100%
    content: ''
    height 100vh
    display block
  &.lifestyle
    background mix($color-bg-lifestyle1, #fff)
    &:before
      gradient($color-bg-lifestyle0, mix($color-bg-lifestyle1, #fff))
  &.family
    background mix($color-bg-family1, #fff)
    &:before
      gradient($color-bg-family0, mix($color-bg-family1, #fff))
  &.remote
    background mix($color-bg-remote1, #fff)
    &:before
      gradient($color-bg-remote0, mix($color-bg-remote1, #fff))
  &.travel
    background mix($color-bg-travel1, #fff)
    &:before
      gradient($color-bg-travel0, mix($color-bg-travel1, #fff))
  &.lifelog
    background mix($color-bg-lifelog1, #fff)
    &:before
      gradient($color-bg-lifelog0, mix($color-bg-lifelog1, #fff))


.article-body
  position relative
  max-width 40rem
  margin 0 auto
  padding-bottom $section-gap * 3


.article-header
  min-height 60vh
  padding-top $section-gap * 2
  .article-title
    padding-bottom $section-gap * 2
    margin 0
    color $color-white

.article-meta
  padding 1rem 0 2rem
  .separator
    margin 0 1rem

</style>

<script>
import { mapState } from 'vuex'
import ArticleFeaturedImage from '~/components/ArticleFeaturedImage'
// import ArticleComments from '~/components/ArticleComments'

export default {
  async asyncData ({ app, store, params, route, payload }) {
    store.commit('setCurrentPath', route.path)

    const query = {
      slug: params.article,
      _embed: 1
    }

    if (!store.state.cachePosts[params.article]) {
      const posts = payload ? {data: [app.$api.mapProparty(payload, 'post')]} : await app.$api.get(`/posts`, query)
      store.commit('setCachePages', {
        path: route.path,
        posts: posts.data
      })
      store.commit('setCachePosts', posts.data)
    }

    if (!store.state.cachePages[store.state.currentPath]) {
      store.commit('setCachePages', {
        path: route.path,
        posts: [store.state.cachePosts[params.article]]
      })
    }

    store.commit('setCurrentQuery', query)
  },

  mixins: {
    longTimestamp: Function
  },

  components: {
    // ArticleComments,
    ArticleFeaturedImage
  },

  computed: {
    article () {
      const page = this.$store.state.cachePages[this.$store.state.currentPath] || {}
      const slug = page.slugs ? page.slugs[0] : null
      return this.$store.state.cachePosts[slug] || {}
      // return this.$store.getters.post || {}
    },
    author () {
      return this.article.author || {}
    },
    categorySlugs () {
      return this.article.terms && this.article.terms[0] ? this.article.terms[0].map(cat => cat.slug).join(' ') : ''
    },
    featuredImage () {
      if (this.article && this.article.images && this.article.images[0]) {
        const featuredImage = this.article.images[0]
        return featuredImage.sizes.large || featuredImage.sizes.full || false
      } else {
        return { height: 0, width: 0 }
      }
    },
    ...mapState([
      'currentPath',
      'cachePages'
    ])
  },

  head () {
    return {
      title: `${this.article.title} | ${this.$store.state.meta.name}`,
      meta: [
        { description: this.article.excerpt }
      ]
    }
  },

  methods: {
  },

  created () {

  },

  watch: {
  }
}
</script>