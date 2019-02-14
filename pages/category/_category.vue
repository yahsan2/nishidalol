<template>
  <section class="category-container main-container" :class="`category-container-${category.slug}`">
    <ArticleList :title="category.slug" :articles="articles" :query="$store.state.currentQuery"/>
  </section>
</template>

<style lang="stylus" scoped></style>

<script>
import { mapGetters, mapState } from 'vuex'
import ArticleList from '~/components/ArticleList'

export default {
  async asyncData({ app, store, params, route, error, payload }) {
    // Set default category cache
    if (!Object.keys(store.state.cacheCategories).length) {
      store.commit('setLoadingStatus', 'loading')
      let categories =
        payload ||
        (await app.$api.get('/categories', {
          per_page: 100
        }))
      store.commit('setCacheCategories', categories.data)
    }
    const category = store.state.cacheCategories[params.category] || null

    if (!category) {
      store.commit('setLoadingStatus', 'loaded')
      error({
        statusCode: 404,
        message: 'ページが見つかりません'
      })
      return false
    }

    const query = {
      orderby: 'date',
      per_page: 100,
      categories: category.id,
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
    articles() {
      return this.$store.state.currentPosts.map(postSlug => {
        return this.$store.state.cachePosts[postSlug] || {}
      })
    },
    category() {
      return this.$store.state.cacheCategories[this.$route.params.category] || {}
    },
    ...mapState(['currentPath', 'cachePages']),
    ...mapGetters(['posts', 'currentPage'])
  },
  components: {
    ArticleList
  },

  head() {
    return {
      title: `${this.category.name} | ${this.$store.state.meta.name}`,
      meta: [
        {
          description: this.$store.state.meta.description
        }
      ]
    }
  }
}
</script>
