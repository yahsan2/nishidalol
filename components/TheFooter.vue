<template>
  <footer class="c-footer" :class="{'is-loaded': loadingStatus === 'loaded'}">
    <div class="f-text">
      <h2><nuxt-link to="/" exact><span>家族でどう楽しく生きるか模索する、にしだけ夫婦ブログ</span></nuxt-link></h2>
      <!-- <p><small>© {{ year }}</small></p> -->
    </div>
    <nav class="f-nav">
      <ul class="f-nav-ul">
        <li class="f-nav-li top">
          <nuxt-link to="/" exact><span>トップ<br>ボタン</span></nuxt-link>
        </li>
        <li class="f-nav-li contact">
          <nuxt-link to="/contact" exact><span>お仕事依頼</span></nuxt-link>
        </li>
        <li class="f-nav-li dream">
          <nuxt-link to="/dream" exact><span>助けて<br>ほしい夢</span></nuxt-link>
        </li>
        <li class="f-nav-li remote">
          <nuxt-link to="/category/remote" exact><span>リモート<br>ワーク</span></nuxt-link>
        </li>
        <li class="f-nav-li family">
          <nuxt-link to="/category/family" exact><span>家族の<br>価値観</span></nuxt-link>
        </li>
        <li class="f-nav-li travel">
          <nuxt-link to="/category/travel" exact><span>旅人<br>お役立ち</span></nuxt-link>
        </li>
        <li class="f-nav-li lifestyle">
          <nuxt-link to="/category/lifestyle" exact><span>暮らし<br>の実験</span></nuxt-link>
        </li>
        <li class="f-nav-li lifelog">
          <nuxt-link to="/category/lifelog" exact><span>にしだけ<br>日記</span></nuxt-link>
        </li>
        <li class="f-nav-li sns">
          <a href="https://pomu.me/nishidalol" title="" target="_blank"><span>SNS<br>フォロー<br>してや</span></a></nuxt-link>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    meta () {
      return this.$store.state.meta
    },
    year () {
      return new Date().getFullYear()
    },
    ...mapState([
      'loadingStatus'
    ])
  }
  // watch: {
  //   loadingStatus (status) {
  //     console.log(status)
  //   }
  // }
}
</script>

<style lang="stylus" scoped>
@import '~assets/style/settings'
.c-footer
  position fixed
  width 100%
  bottom 0
  // background rgba(#fff, .5)

.f-text
  position absolute
  bottom 0
  right 0
  text-align right
  padding 1rem
  h2
    margin 0
    font-size $fontsize-small * 0.8
    a
      color: rgba($color-white, .9)
  p
    font-size $fontsize-small

    font-weight bold
    color: rgba($color-white, .9)

.f-nav
  position relative
  overflow auto
  -webkit-overflow-scrolling touch
  .f-nav-ul
    display flex
    // display: inline-flex
    +tablet()
      justify-content flex-end
    padding $column-gap 0 $column-gap * 2
  .f-nav-li
    display inline-block
    padding-left $column-gap
    transition transform .2s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    transform translateY(200%)
    a
      font-family "Rounded Mplus 1c", sans-serif
      // font-weight 500
    &:last-child
      padding-right $column-gap
    &.top a
      background rgba(mix($color-bg-home0, #fff), .9)
    &.contact a
      background rgba(mix($color-bg-home1, #fff), .9)
    &.dream a
      background rgba(mix($color-bg-lifestyle0, #fff), .9)
    &.lifestyle a
      background rgba(mix($color-bg-lifestyle0, #fff), .9)
    &.family a
      background rgba(mix($color-bg-family0, #fff), .9)
    &.remote a
      background rgba(mix($color-bg-remote0, #fff), .9)
    &.travel a
      background rgba(mix($color-bg-travel0, #fff), .9)
    &.lifelog a
      background rgba(mix($color-bg-lifelog0, #fff), .9)
    &.contact a
      background rgba(mix($color-bg-contact0, #fff), .9)
    &.dream a
      background rgba(mix($color-bg-dream0, #fff), .9)
    &.sns a
      background rgba(mix(#1dcaff, #fff), .9)

      // color #fff
    .is-loaded &,
    &:hover
      transform translateY(0%)
    for num in (1..10)
      .is-loaded &:nth-child({num})
        transition-delay (num - 1) * .075s + 2s
    > a
      border-radius 50%
      display flex
      align-items center
      justify-content center
      color $color-text
      width 5.25rem
      height 5.25rem
      transition transform .25s cubic-bezier(0.175, 0.885, 0.32, 1.575)
      transition transform .25s ease-in-out
      font-size $fontsize-small * 1.2
      letter-spacing -.01em
      +touch()
        width 5rem
        height 5rem
        font-size $fontsize-small
        font-weight bold
      span
        line-height 1.4
        text-align center
        transition transform .1s
        transform-origin 50% 50%
      &:hover
        transform translateY(-.5rem) rotate(-10deg) scale(1.2)
        span
          transform scale(1.2)
      // position relative


      // > span
      //   position absolute
      //   top 50%
      //   top 50%
      // border 1px solid rgba($color-white, .5)



.footer-container
  // align-items: center
  // display: flex
  // flex-direction: column
  // font-family: 'Roboto', sans-serif
  font-size: .7rem
  margin: 0 auto
  // a
  //   color: #aaa
</style>
