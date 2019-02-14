<template>
  <ArticleDetail :article="article" :postType="'post'" />
</template>

<script>
import ArticleDetail from '~/components/ArticleDetail'

export default {
  async asyncData({ app, store, params, route, payload }) {
    const query = {
      slug: params.article,
      _embed: 1
    }

    if (!store.state.cachePosts[params.article]) {
      const posts = payload
        ? {
            data: [app.$api.mapProparty(payload, 'post')]
          }
        : await app.$api.get(`/posts`, query)
      store.commit('setCachePages', {
        path: route.path,
        posts: posts.data
      })
      store.commit('setCachePosts', posts.data)
    }

    if (!store.state.cachePages[route.path]) {
      store.commit('setCachePages', {
        path: route.path,
        posts: [store.state.cachePosts[params.article]]
      })
    }

    store.commit('setCurrentQuery', query)
    store.commit('setCurrentPath', route.path)
    store.commit('setCurrentPosts')
  },

  components: {
    ArticleDetail
  },

  computed: {
    article() {
      const page = this.$store.state.cachePages[this.$store.state.currentPath] || {}
      const slug = page.slugs ? page.slugs[0] : null
      return this.$store.state.cachePosts[slug] || {}
    }
  },
  mounted() {
    if ('twttr' in window) {
      window.twttr.widgets.load()
    }
  }
}
</script>
