<template>
  <section class="home-container main-container">
    <ArticleList
      :title="'NISHIDAKE'"
      :articles="articles"
      :query="$store.state.currentQuery"
    />
  </section>
</template>

<style lang="stylus" scoped>
@import '~assets/style/settings'
</style>


<script>
import { mapGetters, mapState } from 'vuex'
import ArticleList from '~/components/ArticleList'

export default {
  async asyncData ({ app, store, params, route }) {
    const query = {
      orderby: 'date',
      per_page: 100,
      page: 1,
      _embed: 1
    }

    if (!store.state.cachePages[route.path]) {
      store.commit('setLoadingStatus', 'loading')
      const posts = await app.$api.get('/posts', query)
      store.commit('setCachePages', {
        path: route.path,
        posts: posts.data
      })
      store.commit('setCachePosts', posts.data)
    }
    store.commit('setCurrentQuery', query)
    store.commit('setCurrentPath', route.path)
    store.commit('setCurrentPosts')
  },

  computed: {
    articles () {
      // const page = this.$store.state.cachePages[this.$store.state.currentPath] || {}
      return this.$store.state.currentPosts.map((postSlug) => {
        return this.$store.state.cachePosts[postSlug] || {}
      })
    },
    ...mapState([
    ]),
    ...mapGetters([
      'currentPage'
    ])
  },

  components: {
    ArticleList
  },

  head () {
    return {
      title: `${this.$store.state.meta.name}`
    }
  }
}
</script>
