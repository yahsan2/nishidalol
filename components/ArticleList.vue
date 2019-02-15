<template>
  <div id="article-list" class="article-list">
    <div
      class="article-list-container"
      :class="{
        'is-loaded': loadingStatus == 'loaded'
      }"
    >
      <h1
        class="site-title"
        :style="{
          transform: titleTransform
        }"
      >
        <span class="site-title-inner">
          <span v-html="title" />
        </span>
      </h1>
      <div class="articles">
        <Article
          v-for="(article, index) in articles"
          :key="article.id"
          :index="index"
          :scroll-top="scrollTop"
          :length="articles.length"
          :article="article"
          :offset-index="offsetIndex"
          :scroll-speed="scrollSpeed"
          class="article"
        />
      </div>
      <div
        class="scroll-block"
        :style="{
          'min-height': minHeight
        }"
      />
    </div>
    <Loader class="page-loader" />
  </div>
</template>

<style lang="stylus" scoped>
@import '~assets/style/settings';

@keyframes title {
  0% {
    width: 100%;
  }

  25% {
    width: 100%;
  }

  50% {
    width: 100%;
  }

  100% {
    width: 100%;
  }
}

.site-title {
  position: fixed;
  margin: 0 0;
  padding: 0;

  .site-title-inner {
    color: rgba($color-white, 0.5);
    line-height: 1;
    palt();
    upper();
    min-width: 120rem;

    > span {
      display: block;
      transform: translate(-100%, 0);
      text-align: center;
      font-family: '游ゴシック', YuGothic, 'ヒラギノ角ゴ Pro', 'Hiragino Kaku Gothic Pro', 'メイリオ', 'Meiryo', sans-serif;

      +tablet() {
        letter-spacing: -1rem;
      }

      &:after {
        content: '';
        position: absolute;
        background: rgba(#fff, 1);
        display: block;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }

  .is-loaded & {
    .site-title-inner {
      > span {
        transition: all 0.4s ease 0.25s;
        transform: translate(0%, 0);
        width: 100%;

        &:after {
          transition: all 0.4s ease 0.7s;
          transform: translate(100%, 0);
        }
      }
    }
  }

  +mobile() {
    font-size: 5rem;
  }

  +touch() {
    left: 85%;
    top: 0%;

    .site-title-inner {
      transform: translate(-50%, 250%) rotate(90deg);
      transform-origin: 50% 50%;
    }
  }

  +tablet() {
    font-size: 7.5rem;
  }

  +desktop() {
    font-size: 18rem;
    left: 50%;
    top: 40%;

    .site-title-inner {
      transform: translate(-50%, -50%) rotate(20deg);
      // background rgba($color-blue, .4)
    }
  }
}

.page-loader {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.article-list {
  // position
  // height 100%
  // overflow auto
  // -webkit-overflow-scrolling: touch
}

.article-list-container {
  &:before {
    content: '';
    display: block;
    position: fixed;
    height: 100vh;
    width: 100%;
    left: 0;
    top: 0;
    transition: all 0.25s;
    transform: scale(1.1) translate(0, 0);
    opacity: 0.5;
    gradient($color-bg-home0, $color-bg-home1);

    .category-container-lifestyle & {
      gradient($color-bg-lifestyle0, $color-bg-lifestyle1);
    }

    .category-container-family & {
      gradient($color-bg-family0, $color-bg-family1);
    }

    .category-container-remote & {
      gradient($color-bg-remote0, $color-bg-remote1);
    }

    .category-container-travel & {
      gradient($color-bg-travel0, $color-bg-travel1);
    }

    .category-container-lifelog & {
      gradient($color-bg-lifelog0, $color-bg-lifelog1);
    }
  }

  &.is-loaded:before {
    transform: scale(1) translate(0, 0);
    opacity: 1;
  }
}

.scroll-block {
  content: '';
  display: block;
  width: 100vw;
}

.articles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-origin: 20rem 40%;
  transition: all 0.25s;
  transform: translate(0, 0.5rem);
  opacity: 0;

  .is-loaded & {
    transform: translate(0, 0);
    opacity: 1;
  }
}
</style>

<script>
import { mapState } from 'vuex'
import Article from '~/components/Article'
import Loader from '~/components/Loader.vue'

export default {
  components: {
    Article,
    Loader
  },
  props: {
    title: String,
    articles: Array,
    query: Object
  },
  data() {
    return {
      mounted: false,
      scrollTop: 0,
      offsetIndex: 12,
      scrollSpeed: 500
    }
  },
  computed: {
    titleTransform() {
      // return ``
      return `
        translate(0, ${(-1 * this.scrollTop) / this.scrollSpeed}px)
      `
    },
    minHeight() {
      const h = process.browser
        ? this.articles.length * this.scrollSpeed + window.innerHeight / 2
        : 0
      return h + 'px'
    },
    rotate() {
      return {
        transform: `scale(${this.scrollTop}) rotate(${this.rotateDeg}deg)`
      }
    },
    ...mapState(['currentPath', 'cachePages', 'loadingStatus'])
  },
  mounted() {
    if (process.browser) {
      this.scrollSpeed = window.innerWidth > 960 ? 500 : 250
      window.addEventListener('scroll', this.handleScroll)
      setTimeout(
        () => {
          this.initOffsetIndex()
        },
        this.loadingStatus !== 'loaded' ? 1250 : 250
      )
      setTimeout(() => {
        this.$store.commit('setLoadingStatus', 'loaded')
      }, 100)
    }
  },
  beforeDestroy() {
    if (process.browser) {
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    moreArticles(loadingState) {
      if (!this.cachePages[this.currentPath]) return false
      this.cachePages[this.currentPath].paged++
      this.query.page = this.cachePages[this.currentPath].paged
      this.$api
        .get('/posts', this.query)
        .then(response => {
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
    handleScroll() {
      this.scrollTop = window.scrollY
    },
    easeOutCubic(t) {
      const t1 = t - 1
      return t1 * t1 * t1 + 1
    },
    initOffsetIndex() {
      const frame = 60
      const endIndex = 5
      this.offsetIndex = 12
      const timer = setInterval(() => {
        if (this.offsetIndex <= endIndex) {
          this.offsetIndex = endIndex
          clearInterval(timer)
        }
        this.offsetIndex = this.offsetIndex - 0.2
      }, 1000 / frame)
    },
    resetOffsetIndex() {
      const frame = 60
      const timer = setInterval(() => {
        if (this.offsetIndex <= this.articles.length) {
          this.offsetIndex = this.articles.length
          clearInterval(timer)
        }
        this.offsetIndex = this.offsetIndex - 0.2
      }, 1000 / frame)
    }
  }
}
</script>
