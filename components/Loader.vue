<template>
  <div class="spinner">
    <div class="spinner-container">
      <div class="dot1" />
      <div class="dot2" />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@import '~assets/style/settings'

.spinner
  opacity 1
  transition all .25s
  .is-loaded + &,
  [lazy="loaded"] + &
    opacity 0
    +tablet()
      transition all .25s ease .5s
    +mobile()
      transition all 0s


.spinner-container
  width 60px
  height 60px
  // position relative
  text-align center
  -webkit-animation sk-rotate 2.0s infinite linear
  animation sk-rotate 2.0s infinite linear


.dot1, .dot2
  width 60%
  height 60%
  display inline-block
  position absolute
  top 0
  background-color rgba($color-white, .8)
  border-radius 100%
  -webkit-animation sk-bounce 2.0s infinite ease-in-out
  animation sk-bounce 2.0s infinite ease-in-out


.dot2
  top auto
  bottom 0
  -webkit-animation-delay -1.0s
  animation-delay -1.0s


@-webkit-keyframes sk-rotate
  0%
    -webkit-transform rotate(0deg)
  100%
    -webkit-transform rotate(360deg)

@keyframes sk-rotate
  0%
    transform rotate(0deg)
    -webkit-transform rotate(0deg)
  100%
    transform rotate(360deg)
    -webkit-transform rotate(360deg)

@-webkit-keyframes sk-bounce
  0%, 100%
    -webkit-transform scale(0.1)
  50%
    -webkit-transform scale(1.0)


@keyframes sk-bounce
  0%, 100%
    transform scale(0.1)
    -webkit-transform scale(0.1)
   50%
    transform scale(1.0)
    -webkit-transform scale(1.0)
</style>
