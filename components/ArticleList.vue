<template>
  <div class="article-list" id="article-list">
    <div class="articles">
      <no-ssr>
        <!-- <Bubbly/> -->
      </no-ssr>
      <h1 class="site-title">
        <span v-html="title" :style="{'transform': titleTransform}"></span>
      </h1>
      <Article
        v-for="(article, index) in articles"
        :index="index"
        :scrollTop="scrollTop"
        :length="articles.length"
        :key="article.id"
        :article="article"
        :offsetIndex="offsetIndex"
        class="article"
      />
    </div>
    <div class="scroll-block":style="{'min-height': (articles.length + .9) * 500 + 'px'}"></div>
    <no-ssr>
      <InfiniteLoading
        ref="infiniteLoading"
        @infinite="moreArticles"
        <span slot="spinner">
          <Loader/>
        </span>
        <span slot="no-results">
          <div>No Results Articles :)</div>
        </span>
        <span slot="no-more">
          <div>No More Articles :)</div>
        </span>
      </InfiniteLoading>
    </no-ssr>
  </div>
</template>

<style lang="stylus" scoped>
@import '~assets/style/settings'
.site-title
  position fixed
  margin 0 0
  padding 0
  span
    color rgba($color-white, .5)
    line-height 1
    palt()
    upper()
    // text-transform uppercase
  +mobile()
    font-size 5rem
  +touch()
    left 85%
    top 40%
    transform translate(-50%, -50%) rotate(90deg)
    transform-origin 50% 50%
    span

  +tablet()
    font-size 7.5rem
  +desktop()
    font-size 18rem
    left 50%
    top 40%
    transform translate(-50%, -50%) rotate(20deg)
    span
      // background rgba($color-blue, .4)


.spinner
  position: relative
  margin: auto

.article-list
  // position
  // height 100%
  // overflow auto
  // -webkit-overflow-scrolling: touch
.scroll-block
  content ''
  display block
  width 100vw

.articles
  position fixed
  top: 0
  left: 0
  width 100%
  height 100%
  transform-origin: 20rem 40%

.articles
  gradient($color-bg-home0, $color-bg-home1)
  .category-container-lifestyle &
    gradient($color-bg-lifestyle0, $color-bg-lifestyle1)
  .category-container-family &
    gradient($color-bg-family0, $color-bg-family1)
  .category-container-remote &
    gradient($color-bg-remote0, $color-bg-remote1)
  .category-container-travel &
    gradient($color-bg-travel0, $color-bg-travel1)
  .category-container-lifelog &
    gradient($color-bg-lifelog0, $color-bg-lifelog1)
</style>

<script>
import { mapState } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
import Article from '~/components/Article'
import Bubbly from '~/components/Bubbly'
import Loader from '~/components/Loader.vue'

export default {
  components: {
    Article,
    Bubbly,
    InfiniteLoading,
    Loader
  },
  props: {
    title: String,
    articles: Array,
    query: Object
  },
  data () {
    return {
      scrollTop: 0,
      offsetIndex: 10
    }
  },
  computed: {
    titleTransform () {
      // return ``
      return `
        scale(${1 - (this.scrollTop / 500000)})
        translate(0, ${-1 * this.scrollTop / 500}px)
      `
    },
    rotate () {
      return {
        transform: `scale(${this.scrollTop}) rotate(${this.rotateDeg}deg)`
      }
    },
    ...mapState([
      'currentPath',
      'cachePages'
    ])
  },
  methods: {
    moreArticles (loadingState) {
      if (!this.cachePages[this.currentPath]) return
      this.cachePages[this.currentPath].paged++
      this.query.page = this.cachePages[this.currentPath].paged
      this.$api.get('/posts', this.query)
        .then((response) => {
          this.$store.commit('setCachePages', {
            path: this.$route.path,
            posts: response.data
          })
          this.$store.commit('setCachePosts', response.data)
          this.$store.commit('setCurrentPosts')
          loadingState.loaded()
          this.$forceUpdate()
        })
        .catch(() => {
          loadingState.complete()
        })
    },
    handleScroll () {
      this.scrollTop = window.scrollY
    },
    easeOutCubic (t) {
      const t1 = t - 1
      return t1 * t1 * t1 + 1
    },
    initOffsetIndex () {
      // let t = 0
      // const time = 1
      const frame = 60
      const endIndex = 5
      // const diffIndex = this.offsetIndex - endIndex
      const timer = setInterval(() => {
        // t += (diffIndex / (frame * time))
        if (this.offsetIndex <= endIndex) {
          this.offsetIndex = endIndex
          clearInterval(timer)
        }
        // console.log(diffIndex)
        // console.log(diffIndex / (frame * time))
        // console.log(this.easeOutCubic(t))
        // this.offsetIndex = 10 - this.easeOutCubic(t)
        this.offsetIndex = this.offsetIndex - 0.2
        // console.log(this.offsetIndex)
      }, 1000 / frame)
    }
  },
  mounted () {
    if (process.browser) {
      window.addEventListener('scroll', this.handleScroll)
      this.initOffsetIndex()
    }
  },
  beforeDestroy () {
    if (process.browser) {
      window.addEventListener('scroll', this.handleScroll)
    }
    console.log('scrolling Destroyed')
  }
}
</script>