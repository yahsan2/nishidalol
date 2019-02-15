<template>
  <transition name="slide-fade">
    <ArticleDetail :article="article" :postType="'page'" />
  </transition>
</template>

<script>
import ArticleDetail from '~/components/ArticleDetail'

export default {
  async asyncData({ app, store, params, route, payload }) {
    const query = {
      slug: params.page,
      _embed: 1
    }

    if (!store.state.cachePosts[params.page]) {
      const pages = payload
        ? {
            data: [app.$api.mapProparty(payload, 'post')]
          }
        : await app.$api.get(`/pages`, query)
      store.commit('setCachePages', {
        path: route.path,
        posts: pages.data
      })
      store.commit('setCachePosts', pages.data)
    }

    if (!store.state.cachePages[store.state.currentPath]) {
      store.commit('setCachePages', {
        path: route.path,
        posts: [store.state.cachePosts[params.page]]
      })
    }
    store.commit('setCurrentQuery', query)
    store.commit('setCurrentPath', route.path)
    store.commit('setCurrentPosts')
  },

  transition: 'slide-fade',

  components: {
    ArticleDetail
  },

  computed: {
    article() {
      const page =
        this.$store.state.cachePages[this.$store.state.currentPath] || {}
      const slug = page.slugs ? page.slugs[0] : null
      return this.$store.state.cachePosts[slug] || {}
    }
  },

  head() {
    return {
      title: `${this.article.title} | ${this.$store.state.meta.name}`,
      meta: [
        {
          description: this.article.excerpt
        }
      ]
    }
  }
}
</script>
