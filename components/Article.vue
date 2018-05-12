<template>
  <article class="c-list-article" :class="{'is-active': isActive}">
    <h2 class="article-title" :style="titlePosition">
      <nuxt-link :to="`/${article.type}/${article.slug}`" v-html="article.title"></nuxt-link>
    </h2>
    <div class="article-body-container" :style="position">
      <nuxt-link :to="`/${article.type}/${article.slug}`" class="article-body" :class="categorySlugs">
        <div
          v-if="featuredImage"
          :style="{'background-image': `url(${featuredImage.source_url})`}"
          class="article-thumbnail"
        />
<!--         <ArticleFeaturedImage
          v-if="featuredImage"
          :featured-image="featuredImage"
          class="article-thumbnail hide"
          x
        /> -->
      </nuxt-link>
    </div>
  </article>
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
  +touch()
    left 70%
  &.is-active
    z-index 1

.article-body-container
  position absolute
  top: 0
  left: 0
  width 100%
  height 100%
  // gradient(#f9f, #f9f)

.article-body
  gradient(#ff9, #fff)
  &.lifestyle
    gradient(#f7b4d9, #f5ecca)
    background mix(#f2989a, #fff)
  &.family
    gradient(#ff5f6d, #fdf9d5)
    gradient(#fff38d, #fdf9d5)
    gradient(lighten(mix(#ff5f6d,#ffc371), 10%), mix(#ffc371,#fff))
    background mix(#ffdf71, #fff)

    // gradient(lighten(#ff5f6d,40%), lighten(#ffc371,40%))
  &.remote
    gradient(#d7fffe, #fcf5fd)
    background mix(#00c6fb, #fff)
  &.travel
    gradient(#aefb7f, #e5f9d5)
    gradient(lighten(mix(#12fff7,#b3ffab), 10%), mix(#b3ffab,#fff))
    background mix(#b3ffab,#fff)
  &.lifelog
    gradient(#a8c1ec, lighten(#fac1eb, 60%))
    background mix(#a8d3ff,#fff)
  border-radius: 50%
  background-blend-mode: darken
  // +media("tablet")
  //   box-shadow 1.5rem 1.5rem 30px rgba(#999, .6)
  width 10rem
  height 10rem
  display block
  overflow hidden
  position relative
  transition: all .25s ease-in-out
  opacity: 0.8
  .is-active &
    opacity .98
    +media("mobile")
      transform: scale(1.5) translate3d(.5rem, -1rem, 0)
    +media("tablet")
      transform: scale(3) translate3d(-6rem, -2rem, 0)
  &:hover
    opacity 1

.article-title
  position fixed
  bottom 25%
  left 5%
  margin-left 2rem
  z-index 0
  transition: opacity 1s ease-out
  padding 1rem 2rem
  min-width 20rem
  max-width 40%
  font-size 3rem
  a
    color: rgba($color-white, .25)
    color: $color-gray
    transition: all .25s ease-out
    transform scale(.75)

    display inline-block
  +touch()
    font-size $fontsize-xxlarge
  +mobile()
    top 60%
    bottom auto
    left 0%
    width 100%
    max-width none

    margin-left 0
    // height 100%
    text-align center
    // background rgba(#fff, 0.5)
    // left 50%
    // transform scale(1) translate(-50%, -50%)
    // margin-top 2rem
    a
      padding 2rem
      width 100%
      font-size 1.5rem
      // border-radius: 50%

  .is-active &
    transition-delay: .2s
    opacity .98
    a
      color: $color-heading
      transform scale(1)


  // .is-ended &
  //   opacity 0


.article-thumbnail
  background no-repeat center
  background-size cover
  position absolute
  top: 0
  left: 0
  width 100%
  height 100%
  opacity 0
  transition: opacity .25s ease-out .35s
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
    categorySlugs () {
      return this.article.terms && this.article.terms[0] ? this.article.terms[0].map(cat => cat.slug).join(' ') : ''
    },
    titlePosition () {
      return {
        'transform': `translate3d(0, ${-1 * this.scrollTop * 1.25 + (this.index + 0.25) * 625}px, 0)`
      }
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
      const stepScroll = this.scrollTop / 500

      const index = stepScroll < this.offsetIndex + this.index ? this.offsetIndex + this.index - stepScroll : 0

      const rad = (2 * Math.PI * originDeg / 360) - Math.pow(index, radPow) * (2 * Math.PI * stepDeg / 360)

      this.x = (originRadius - Math.pow(index, radiusPow) * stepRadius) * Math.cos(rad) * 0.5
      this.y = (originRadius - Math.pow(index, radiusPow) * stepRadius) * Math.sin(rad) * 0.6
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