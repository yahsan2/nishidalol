<template>
  <article class="c-list-article" :style="position">
    <ArticleFeaturedImage
      v-if="featuredImage"
      :featured-image="featuredImage"
      class="hide"
    />
    <nuxt-link :to="`/${article.type}/${article.slug}`" class="article-body">
      <h2 v-html="article.title"></h2>
    </nuxt-link>
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
  overflow hidden
  position absolute
  gradient(#f99, #fff)
  border-radius: 50%
  left 50%
  top 45%
  -webkit-box-shadow #FFF
  box-shadow 1rem 1rem 30px rgba(#999, .6)
  &.is-active
    width 10rem
    height 10rem
  margin-left 3 rem
  margin-top -6rem
  width 12rem
  height 12rem



</style>

<script>
import ArticleFeaturedImage from '~/components/ArticleFeaturedImage'
import Loader from '~/components/Loader'

export default {
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
    position () {
      const displayLenght = 10
      // const originWidth = 12 // 15rem, 240px
      const originScale = 2
      const originDeg = 80
      const originRadius = 35 //
      const originIndex = 1000 //

      const stepDeg = 50 // 45deg
      const stepRadius = originRadius / displayLenght
      const stepScale = originScale / displayLenght

      const radPow = 1.2
      const radiusPow = 1
      const scalePow = 1.05
      const stepScroll = this.scrollTop / 100

      const index = stepScroll < this.offsetIndex + this.index ? this.offsetIndex + this.index - stepScroll : 0

      const rad = (2 * Math.PI * originDeg / 360) - Math.pow(index, radPow) * (2 * Math.PI * stepDeg / 360)

      const x = (originRadius - Math.pow(index, radiusPow) * stepRadius) * Math.cos(rad) * 0.45
      const y = (originRadius - Math.pow(index, radiusPow) * stepRadius) * Math.sin(rad) * 0.7
      // const x = (originRadius - Math.pow(index, radiusPow) * stepRadius) * Math.cos(rad) * 0.5 * Math.pow(index, 1)
      // const y = (originRadius - Math.pow(index, radiusPow) * stepRadius) * Math.sin(rad) * 1.2
      const z = rad

      const scrollScale = 0
      // const scrollScale = Math.pow(stepScroll, pow) * stepScale
      let scale = originScale - Math.pow(index, scalePow) * stepScale + scrollScale
      scale = (y > 33 || scale < 0) ? 0 : scale

      return {
        'transform': `scale(${scale}) translate3d(${x}rem, ${y}rem, ${z}rem)`,
        // 'width': `${originWidth}rem`,
        // 'height': `${originWidth}rem`,
        // 'margin-left': `${1 * originWidth / 4}rem`,
        // 'margin-top': `${-1 * originWidth / 2}rem`,
        'z-index': `${originIndex - this.index}`
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