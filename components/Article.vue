<template>
  <article class="c-list-article" :class="{'is-active': isActive}">
    <h2 class="article-title">
      <nuxt-link :to="`/${article.type}/${article.slug}`" v-html="article.title"></nuxt-link>
    </h2>
    <div class="article-body-container" :style="position">
      <nuxt-link :to="`/${article.type}/${article.slug}`" class="article-body">
        <ArticleFeaturedImage
          v-if="featuredImage"
          :featured-image="featuredImage"
          class="article-thumbnail"
          :style="{'background-image': featuredImage}"
        />
      </nuxt-link>
    </div>
<!--
    <div class="article-meta">
      <span class="categories">
        <nuxt-link class="term" v-for="term in article.terms[0]" :to="`/category/${term.slug}`" :key="term.id" v-html="term.name" v-if="article.terms[0]"></nuxt-link>
      </span>
    </div>
    <nuxt-link :to="`/${article.type}/${article.slug}`" class="article-body">
      <div class="columns">
        <div class="column article-thumbnail">

        </div>
        <div class="column article-content">
          <h2 v-html="article.title"></h2>
          <div class="excerpt" v-html="article.excerpt"></div>
        </div>
      </div>
    </nuxt-link>
 -->  </article>
</template>

<style lang="stylus" scoped>
@import '~assets/style/settings'

.c-list-article
  position absolute
  left 55%
  top 55%
  margin-left 0rem
  margin-top -6rem
  z-index: 0

.article-body-container
  position absolute
  top: 0
  left: 0
  width 100%
  height 100%
  // gradient(#f9f, #f9f)

.article-body
  .c-list-article &
    gradient(#ff9, #fff)
  .c-list-article::nth-child(4n+1) &
    gradient(#f9f, #fff)
  .c-list-article::nth-child(4n+2) &
    gradient(#f99, #fff)
  .c-list-article::nth-child(4n+3) &
    gradient(#99f, #fff)
  border-radius: 50%
  background-blend-mode: darken
  // +media("tablet")
  //   box-shadow 1.5rem 1.5rem 30px rgba(#999, .6)
  width 10rem
  height 10rem
  display block
  overflow hidden
  transition: all .25s ease-in-out
  .is-active &
    +media("mobile")
      transform: scale(1.5) translate3d(.5rem, -1rem, 0)
    +media("tablet")
      transform: scale(3) translate3d(-6rem, -2rem, 0)

.article-title
  position fixed
  bottom 25%
  left 5%
  transform translate(0, 50%)
  opacity 0
  z-index 0
  margin-top 10px
  transition: opacity .25s ease-out
  padding 1rem 2rem
  text-align justify
  min-width 20rem
  max-width 50%
  max-width 40%
  font-size 5rem
  font-size 3rem
  a:hover,
    color #fff
  +mobile()
    background rgba(#fff, 0.5)
    font-size 1.5rem
    top 50%
    bottom auto
    left 50%
    transform scale(1) translate(-50%, -50%)
    margin-top 2rem
  .is-active &
    transition-delay: .2s
    opacity 1


.article-thumbnail
  position absolute
  top: 0
  left: 0
  opacity 0
  transition: opacity .25s ease-out
  .is-active &,
  .article-body:hover &
    opacity 1
  .is-active &
    transition-delay: .35s


</style>

<script>
import ArticleFeaturedImage from '~/components/ArticleFeaturedImage'
import Loader from '~/components/Loader'

export default {
  data () {
    return {
      x: 0,
      y: 0
    }
  },
  props: {
    article: Object,
    index: Number,
    scrollTop: Number,
    offsetIndex: Number
  },
  components: {
    ArticleFeaturedImage,
    Loader
  },
  computed: {
    isActive () {
      // -12.9819rem, -4.21808rem
      return this.x < -9 && this.y < -1 && this.scale > 0
    },
    isEnded () {
      return this.x < -9 || this.y < -1
    },
    position () {
      const displayLenght = 10
      // const originWidth = 12 // 15rem, 240px
      const originScale = 1.6
      const originDeg = 80
      const originRadius = 35 //
      // const originIndex = 1000 //

      const stepDeg = 50 // 45deg
      const stepRadius = originRadius / displayLenght
      const stepScale = originScale / displayLenght

      const radPow = 1
      const radiusPow = 0.5
      const scalePow = 0.95
      const stepScroll = this.scrollTop / 200

      const index = stepScroll < this.offsetIndex + this.index ? this.offsetIndex + this.index - stepScroll : 0

      const rad = (2 * Math.PI * originDeg / 360) - Math.pow(index, radPow) * (2 * Math.PI * stepDeg / 360)

      this.x = (originRadius - Math.pow(index, radiusPow) * stepRadius) * Math.cos(rad) * 0.5
      this.y = (originRadius - Math.pow(index, radiusPow) * stepRadius) * Math.sin(rad) * 0.5
      // const x = (originRadius - Math.pow(index, radiusPow) * stepRadius) * Math.cos(rad) * 0.5 * Math.pow(index, 1)
      // const y = (originRadius - Math.pow(index, radiusPow) * stepRadius) * Math.sin(rad) * 1.2
      const z = rad

      const scrollScale = 0
      // const scrollScale = Math.pow(stepScroll, pow) * stepScale
      this.scale = originScale - Math.pow(index, scalePow) * stepScale + scrollScale
      this.scale = (this.scale < 0) ? 0 : this.scale

      return {
        'transform': `scale(${this.scale}) translate3d(${this.x}rem, ${this.y}rem, ${z}rem)`
        // 'width': `${originWidth}rem`,
        // 'height': `${originWidth}rem`,
        // 'margin-left': `${1 * originWidth / 4}rem`,
        // 'margin-top': `${-1 * originWidth / 2}rem`,
        // 'z-index': `${originIndex - this.index}`
      }
    },
    featuredImage () {
      if (this.article && this.article.images && this.article.images[0]) {
        const featuredImage = this.article.images[0]
        return featuredImage.sizes.large || featuredImage.sizes.full || false
      } else {
        return { height: 0, width: 0 }
      }
    }
  },
  mixins: {
    shortTimestamp: Function
  }
}
</script>