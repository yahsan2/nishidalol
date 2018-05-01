<template>
  <div class="article-list" id="article-list">
    <div class="articles">
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
    <div class="scroll-block":style="{'min-height': (articles.length) * 100 + 1070 + 'px'}"></div>
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
  background #efefef
  display block
  width 100vw

.articles
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
import Loader from '~/components/Loader.vue'

export default {
  components: {
    Article,
    InfiniteLoading,
    Loader
  },
  props: {
    articles: Array,
    query: Object
  },
  data () {
    return {
      containerId: '#article-list',
      rotateDeg: 0,
      scale: 1,
      scrollTop: 0,
      offsetIndex: 10
    }
  },
  computed: {
    rotate () {
      return {
        transform: `scale(${this.scale}) rotate(${this.rotateDeg}deg)`
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
      this.rotateDeg = window.scrollY * 10
      this.scale = window.scrollY * 10
      this.scrollTop = window.scrollY
    }
  },
  mounted () {
    if (process.browser) {
      window.addEventListener('scroll', this.handleScroll)
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