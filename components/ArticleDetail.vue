<template>
  <article class="single article-container section" :class="categorySlugs">
    <transition name="slide-fade">
      <div class="article-body typeset" :class="{ 'no-featured-image': !featuredImage }">
        <header class="article-header" v-if="article.title">
          <h1 class="article-title" v-html="article.title"></h1>
          <ArticleFeaturedImage
            v-if="featuredImage"
            :featured-image="featuredImage"
          />
          <p class="article-meta" v-if="['page','contact', 'dream', 'thankyou'].indexOf(article.slug) !== -1 ">
            <span>{{ longTimestamp(article.date) }}</span>
            <span class="separator">|</span>
            <!-- <nuxt-link class="author fancy" :to="`/authors/${author.slug}`"></nuxt-link> -->
            <span>{{ author.name }}</span>
            <span class="separator">|</span>
            <span class="categories" v-if="article.terms && article.terms[0]">
              <nuxt-link class="term" v-for="term in article.terms[0]" :to="`/category/${term.slug}`" :key="term.id" v-html="term.name"></nuxt-link>
            </span>
          </p>
        </header>
        <section v-html="article.content" class="article-main section" v-if="['contact', 'dream', 'thankyou'].indexOf(postType) === -1 "/>
        <Contact v-if="postType === 'contact'" />
        <Dream v-if="postType === 'dream'" />
        <Thankyou v-if="postType === 'thankyou'" />
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
  background mix($color-bg-home1, #fff)
  &:before
    content: ''
    gradient(mix($color-bg-home0, #fff), mix($color-bg-home1, #fff))
    position absolute
    top 0
    left 0
    width 100%
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
  &.contact, &.thankyou
    background mix($color-bg-contact1, #fff)
    &:before
      gradient($color-bg-contact0, mix($color-bg-contact1, #fff))
  &.dream
    background mix($color-bg-dream1, #fff)
    &:before
      gradient($color-bg-dream0, mix($color-bg-dream1, #fff))


.article-body
  position relative
  max-width 40rem
  margin 0 auto
  padding-bottom $section-gap * 3


.article-header
  .post &
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
import Contact from '~/components/Contact'
import Dream from '~/components/Dream'
import Thankyou from '~/components/Thankyou'

export default {
  props: {
    article: Object,
    content: String,
    postType: String
  },

  mixins: {
    longTimestamp: Function
  },

  components: {
    ArticleFeaturedImage,
    Contact,
    Dream,
    Thankyou
  },

  computed: {
    author () {
      return this.article.author || {}
    },
    categorySlugs () {
      const terms = this.article.terms && this.article.terms[0] ? this.article.terms[0].map(cat => cat.slug) : []
      return terms.concat(this.article.slug).concat(this.postType).join(' ')
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

  mounted () {
    this.$store.commit('setLoadingStatus', 'loaded')
  },

  watch: {
  }
}
</script>