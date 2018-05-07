<template>
  <div class="article-list" id="article-list">
    <div class="articles">
      <no-ssr>
        <!-- <Bubbly/> -->
      </no-ssr>
      <h1 class="site-title" :style="{'transform': titleTransform}">
        <span v-html="siteTitle"></span>
      </h1>
      <Article
        v-for="(article, index) in articles"
        :index="index"
        :scrollTop="scrollTop"
        :length="articles.length"
        :key="article.id"
        :article="article"
        :offsetIndex="offsetIndex"
      />
    </div>
    <div class="scroll-block":style="{'min-height': (articles.length + 1.5) * 500 + 'px'}"></div>
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
  left 85%
  top 40%
  // margin 4rem 0 0
  padding 0
  transform-origin 50% 50%
  span
    color $color-white
    transform translate(-50%, -50%) rotate(90deg)
    transform-origin 50% 50%
    line-height 1
    palt()
  +mobile()
    font-size 5rem
  +tablet()
    font-size 7.5rem
  +desktop()
    font-size 8rem

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
  gradient(#fff200, #32e5e9)
  position fixed
  top: 0
  left: 0
  width 100%
  height 100%
  transform-origin: 20rem 40%

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
    siteTitle: String,
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
      return `scale(${1 - (0.0000005 * this.scrollTop)}) translate(0, ${-1 * this.scrollTop / 700}px)`
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