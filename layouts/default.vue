<template>
  <div id="container">
    <main>
      <nuxt />
    </main>
    <TheFooter />
  </div>
</template>

<style lang="stylus">
@import '~assets/style/settings';

.font-light {
  font-weight: $font-weight-light;
}

.font-regular {
  font-weight: $font-weight-regular;
}

.font-heavy {
  font-weight: $font-weight-heavy;
}

// utility
.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.text-center {
  text-align: center;
}

.text-justify {
  text-align: justify;
}

.center {
  margin-left: auto;
  margin-right: auto;
}

.right {
  float: right;
}

.left {
  float: left;
}

.cf {
  clearfix();
}

.hide {
  display: none;
}

+media('small-only') {
  .hide-small-only {
    display: none;
  }
}

.nuxt-progress {
  position: fixed;
  // max-width 80%
  height: 0.8rem !important;
  bottom: 0%;
  top: auto;
  left: 50%;
  transform: translate(-50%, 0%);
}
</style>

<script>
import TheFooter from '../components/TheFooter'

export default {
  components: {
    TheFooter
  },
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'bubble_chart',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  mounted() {
    this.defaultPostCache()
    this.defaultCategoryCache()
  },
  methods: {
    async defaultPostCache() {
      const query = {
        orderby: 'date',
        per_page: 100,
        page: 1,
        _embed: 1
      }
      if (!this.$store.state.cachePages['/']) {
        const posts = await this.$api.get('/posts', query)
        this.$store.commit('setCachePages', {
          path: '/',
          posts: posts.data
        })
        this.$store.commit('setCachePosts', posts.data)
      }
    },
    async defaultCategoryCache() {
      if (this.$store.state.cacheCategories.length > 0) {
        const categories = await this.$api.get('/categories', {
          per_page: 100
        })
        this.$store.commit('setCacheCategories', categories.data)
      }
    }
  }
}
</script>
