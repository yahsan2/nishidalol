<template>
  <article class="single article-container section"
    :class="categorySlugs"
    >
    <div class="article-body typeset"
      :class="{'is-loaded': loadingStatus == 'loaded' }"
    >
      <header class="article-header" v-if="article.title">
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
      <section v-html="article.content" class="article-main section" v-if="['contact', 'dream', 'thankyou'].indexOf(postType) === -1 "/>
      <Contact v-if="postType === 'contact'" />
      <Dream v-if="postType === 'dream'" />
      <Thankyou v-if="postType === 'thankyou'" />
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
  .post &
    min-height 60vh
  padding-top $section-gap * 2
  .article-title
    padding-bottom $section-gap * 2
    margin 0
    color $color-white
    // font-family "游ゴシック", YuGothic, "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro", "メイリオ", "Meiryo", sans-serif
    letter-spacing -.075rem


.article-meta
  padding 1rem 0 2rem
  .separator
    margin 0 1rem

.article-footer
  .share-icon
    cursor pointer
    display inline-block
    transition all .25s
    &:hover
      transform scale(1.2)
    & + .share-icon
      margin-left .75rem

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
      return `https://nishida.lol/${this.article.type}/${this.article.slug}`
    },
    encodePermalink () {
      return encodeURIComponent(this.permalink)
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
      title: `${this.article.title} | ${this.$store.state.meta.name}`,
      meta: [
        { description: this.article.excerpt }
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