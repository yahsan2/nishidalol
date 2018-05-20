<template>
  <article class="single article-container section"
    :class="categorySlugs"
    >
    <div class="bg"
      :style="{'background-image': `url(${featuredImage.source_url})`}"
      v-if="featuredImage && featuredImage.source_url"
    ></div>
    <div class="article-body typeset"
      :class="{'is-loaded': loadingStatus == 'loaded' }"
    >
      <header class="article-header" v-if="article.title" :class="{'has-image': featuredImage && featuredImage.source_url}">
        <h1 class="article-title" v-html="article.title"></h1>
        <ArticleFeaturedImage
          v-if="featuredImage"
          :featured-image="featuredImage"
        />
        <p class="article-meta" v-if="['page','contact', 'dream', 'thankyou'].indexOf(article.slug) === -1 ">
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
      <section v-html="article.content" class="article-main section" v-if="['contact', 'dream', 'thankyou'].indexOf(article.slug) === -1 "/>
      <Contact v-if="article.slug === 'contact'" />
      <Dream v-if="article.slug === 'dream'" />
      <Thankyou v-if="article.slug === 'thankyou'" />
      <footer class="section article-footer" v-if="article.title">
        <h4>シェアボタンでシェアできるよ。</h4>
        <p>
          <a class="share-icon" @click.prevent="popupWindow('twitter')">
              <Twitter/>
          </a>
          <a class="share-icon" @click.prevent="popupWindow('facebook')">
              <Facebook/>
          </a>
          <a class="share-icon" @click.prevent="copyPermalink()">
              <LinkIcon/>
          </a>
        </p>
        <p><small>シェアしてくれたら、嬉しすぎてバビっちゃうYO</small></p>
      </footer>
      <!-- <ArticleComments :article="article"/> -->
    </div>
    <Loader class="article-loader" />
  </article>
</template>

<style lang="stylus">
@import '~assets/style/settings'
.comment
  clearfix()
  $w = 3.5rem
  position relative
  min-height $w + .5rem
  > span
    border-radius .5rem
    padding .5rem .75rem
    display block
    margin-left $w + .75rem
    ul
      margin .5rem 0 0
      padding 0
    &:after
      content: ''
      border .1rem solid rgba($color-white, .9)
      background rgba($color-white, .5)
      background-size cover
      width $w
      height $w
      border-radius 50%
      margin-bottom 0rem
      display block
      position absolute
      left 0
      top .5rem
    &:before
      position absolute
      top $w + .25rem
      left $w * 0.5
      transform translate(-50%, 0)
      font-size $fontsize-xsmall
      font-weight bold
  &.rio
    span
      background rgba($color-white, .7)
      &:after
        background-image url('~assets/images/dream/rio.png')
      &:before
          content: '宮本さん'
  &.aya
    span
      background rgba($color-white, .7)
      &:after
        background-image url('~assets/images/dream/aya.png')
      &:before
        content: 'あやかさん'
  & + h2,
  & + h3
    margin-top $section-gap * 1.5
    display inline-block
</style>
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


  > .bg
    position absolute
    top 0
    left 0
    mix-blend-mode darken
    opacity 0.25
    width 100%
    height 100vh
    display block
    background no-repeat center
    background-size cover
    filter grayscale(100%)
    &:before
      content ''
      position absolute
      top 0
      left 0
      background: linear-gradient(transparent, transparent 45%, #fff)
      width 100%
      height 100vh

    // min-height 100vh
    // background #fff

.article-body
  position relative
  max-width 40rem
  margin 0 auto
  padding-bottom $section-gap * 3
  transition all .25s
  transform translate(0, .5rem)
  opacity 0
  &.is-loaded
    transform translate(0, 0)
    opacity 1
.article-loader
  position fixed
  top 50%
  left 50%
  transform translate(-50%, -50%)

.article-header
  padding-top $section-gap * 2
  padding-bottom $section-gap * 2
  &.has-image
    +tablet()
      min-height 70vh
    +mobile()
      min-height 50vh
    .article-title
      padding-bottom $section-gap * 2
  .article-title
    margin 0
    color $color-white
    .page &
      font-family $fontfamily-sansserif-ja

    // font-weight 500
    // font-family "游ゴシック", YuGothic, "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro", "メイリオ", "Meiryo", sans-serif
    // letter-spacing -.075rem


.article-meta
  padding 1rem 0 2rem
  .separator
    margin 0 1rem
  span, a
    font-family $fontfamily-gothic-ja

.article-footer
  border-top 5px solid rgba(#fff, .5)
  margin-top 4rem
  padding-top 4rem
  border-bottom 5px solid rgba(#fff, .5)
  margin-bottom 4rem
  padding-bottom 4rem
  .share-icon
    cursor pointer
    display inline-block
    transition all .25s
    background rgba(#fff, .5)
    padding 0.75rem
    border-radius 50%
    svg
      display block
    &:hover
      transform scale(1.1)
    & + .share-icon
      margin-left 1rem

  svg
    width 25px
    height 25px
    line-height 1
  p
    line-height 1
  .a
    fill blue !important
</style>

<script>
import { mapState } from 'vuex'
import ArticleFeaturedImage from '~/components/ArticleFeaturedImage'
import Contact from '~/components/Contact'
import Dream from '~/components/Dream'
import Thankyou from '~/components/Thankyou'
import Loader from '~/components/Loader'

import LinkIcon from '~/assets/svg/link'
import Facebook from '~/assets/svg/facebook'
import Twitter from '~/assets/svg/twitter'

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
    Thankyou,
    Loader,
    Facebook,
    Twitter,
    LinkIcon
  },

  computed: {
    permalink () {
      let permalink = [`https://nishida.lol`]
      if (this.article.type) permalink.push(this.article.type)
      if (this.article.slug) permalink.push(this.article.slug)
      return permalink.join('/')
    },
    encodePermalink () {
      return encodeURIComponent(this.permalink)
    },
    stripTitle () {
      return this.article.title && this.article.title.replace(/<(?:.|\n)*?>/gm, '')
    },
    stripDesc () {
      return this.article.excerpt && this.article.excerpt.replace(/<(?:.|\n)*?>/gm, '')
    },
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
      'cachePages',
      'loadingStatus'
    ])
  },

  head () {
    return {
      title: this.stripTitle,
      meta: [
        {
          name: 'description',
          content: this.stripDesc,
          hid: 'description'
        },
        {
          property: 'og:title',
          content: this.stripTitle,
          hid: 'ogTitle'
        },
        {
          property: 'og:description',
          content: this.stripDesc,
          hid: 'ogDesc'
        },
        {
          property: 'og:image',
          content: this.article.images[0] && this.article.images[0].sizes.full.source_url,
          hid: 'ogImage'
        },
        {
          property: 'twitter:image',
          content: this.article.images[0] && this.article.images[0].sizes.full.source_url
        },
        { property: 'og:type', content: 'article' }
      ]
    }
  },

  methods: {
    execCopy (string) {
      const temp = document.createElement('div')

      temp.appendChild(document.createElement('pre')).textContent = string

      const s = temp.style
      s.position = 'fixed'
      s.left = '-100%'

      document.body.appendChild(temp)
      document.getSelection().selectAllChildren(temp)

      const result = document.execCommand('copy')
      document.body.removeChild(temp)
      return result
    },
    copyPermalink () {
      if (this.execCopy(this.permalink)) {
        window.alert(`${this.permalink} をクリッピボードにコピーしました`)
      } else {
        window.alert('このブラウザでは対応していません')
      }
    },
    popupWindow (sns) {
      if (process.browser) {
        const w = 650
        const h = 450

        const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left
        const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top

        const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
        const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height

        const left = ((width / 2) - (w / 2)) + dualScreenLeft
        const top = ((height / 2) - (h / 2)) + dualScreenTop

        let permalink
        switch (sns) {
          case 'facebook':
            permalink = `https://www.facebook.com/sharer/sharer.php?u=${this.encodePermalink}&v=3`
            break
          case 'twitter':
            permalink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(this.article.title) + '%20@nishidalol'}%20${this.encodePermalink}`
            break
          default:
            break
        }

        const newWindow = window.open(permalink, sns, 'scrollbars=yes, menubar=no, toolbar=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)

        if (window.focus) {
          newWindow.focus()
        }
      }
    }
  },

  mounted () {
    setTimeout(() => {
      this.$store.commit('setLoadingStatus', 'loaded')
    }, 100)
  },

  watch: {
  }
}
</script>