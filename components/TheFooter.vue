<template>
  <footer class="c-footer hide">
    <div v-if="meta" class="footer-container container section">
      <p><nuxt-link class="fancy" to="/" exact><span v-html="meta.name"></span></nuxt-link></p>
      <p v-if="meta.description" v-html="meta.description"></p>
      <p>© {{ year }}</p>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    meta () {
      return this.$store.state.meta
    },
    year () {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/style/settings'
.c-footer
  position fixed
  width 100%
  bottom 0

.footer-container
  align-items: center
  display: flex
  flex-direction: column
  font-family: 'Roboto', sans-serif
  font-size: .7rem
  margin: 0 auto
  a
    color: #aaa
</style>
