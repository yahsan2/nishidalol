<template>
  <article class="c-list-article" :class="{ 'is-active': isActive }">
    <h2 class="article-title">
      <nuxt-link :to="`/${article.type}/${article.slug}`" v-html="article.title" />
    </h2>
    <div class="article-body-container" :style="positionStyle">
      <nuxt-link :to="`/${article.type}/${article.slug}`" class="article-body" :class="categorySlugs">
        <div
          v-if="featuredImage && featuredImage.source_url"
          :style="{
            'background-image': `url(${featuredImage.source_url})`
          }"
          class="article-thumbnail"
        />
      </nuxt-link>
    </div>
  </article>
</template>

<style lang="stylus" scoped>
@import '~assets/style/settings';

.c-list-article {
  position: absolute;
  left: 55%;
  top: 55%;
  margin-left: 0rem;
  margin-top: -6rem;
  z-index: 0;

  +touch() {
    top: 45%;
    left: 70%;
  }

  &.is-active {
    z-index: 1;
  }
}

.article-body-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // gradient(#f9f, #f9f)
}

.article-body {
  background: mix($color-bg-home0, #fff);

  &.lifestyle {
    background: mix($color-bg-lifestyle1, #fff);
  }

  &.family {
    background: mix($color-bg-family1, #fff);
  }

  &.remote {
    background: mix($color-bg-remote1, #fff);
  }

  &.travel {
    background: mix($color-bg-travel1, #fff);
  }

  &.lifelog {
    background: mix($color-bg-lifelog1, #fff);
  }

  border-radius: 50%;
  background-blend-mode: darken;
  width: 10rem;
  height: 10rem;
  display: block;
  overflow: hidden;
  position: relative;
  transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0.8;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }

  .is-active & {
    opacity: 1;

    +media('mobile') {
      transform: scale(1.5) translate3d(0.5rem, -1rem, 0);
    }

    +media('tablet') {
      transform: scale(3) translate3d(-6rem, -2rem, 0);
    }
  }
}

.article-title {
  position: fixed;
  bottom: 25%;
  left: 5%;
  margin-left: 2rem;
  z-index: 0;
  transition: opacity 0.25s ease-out;
  padding: 1rem 2rem;
  min-width: 20rem;
  max-width: 40%;
  font-size: 3rem;
  font-family: '游ゴシック', YuGothic, 'ヒラギノ角ゴ Pro', 'Hiragino Kaku Gothic Pro', 'メイリオ', 'Meiryo', sans-serif;

  // // font-family
  // font-weight 500
  a {
    letter-spacing: -0.1rem;
  }

  transform: translate3d(0, 50%, 0);
  opacity: 0;

  .is-active & {
    transition-delay: 0.35s;
    opacity: 1;
  }

  +touch() {
    font-size: $fontsize-xxlarge;

    .is-active & {
      transition-delay: 0s;
    }
  }

  +mobile() {
    top: 50%;
    bottom: auto;
    left: 0%;
    width: 100%;
    max-width: none;
    margin-left: 0;
    transform: translate3d(0, -50%, 0);
    margin-top: 3rem;
    background: rgba($color-white, 0.5);
    text-align: center;
    padding: 1rem;

    a {
      width: 100%;
      font-size: $fontsize-large;
    }
  }
}

.article-thumbnail {
  background: no-repeat center;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.25s ease-out;

  .is-active &, .article-body:hover & {
    opacity: 1;
  }

  .is-active & {
    transition-delay: 0.35s;
  }
}
</style>

<script>
export default {
  mixins: {
    shortTimestamp: Function
  },
  props: {
    article: Object,
    index: Number,
    scrollTop: Number,
    offsetIndex: Number,
    scrollSpeed: Number
  },
  data() {
    return {
      x: 0,
      y: 0
    }
  },
  computed: {
    isActive() {
      // -12.9819rem, -4.21808rem
      return this.position.x < -9 && this.position.y < -1 && this.position.scale > 0
    },
    categorySlugs() {
      return this.article.terms && this.article.terms[0] ? this.article.terms[0].map(cat => cat.slug).join(' ') : ''
    },
    positionStyle() {
      return {
        transform: `scale(${this.position.scale}) translate3d(${this.position.x}rem, ${this.position.y}rem, 0)`,
        display: this.position.scale > 0 && this.position.y < 20 ? 'block' : 'none'
      }
    },
    position() {
      const displayLenght = 10
      // const originWidth = 12 // 15rem, 240px
      const originScale = 1.6
      const originDeg = 80
      const originRadius = 35 //
      // const originIndex = 1000 //

      const stepDeg = 50 // 45deg
      const stepRadius = originRadius / displayLenght
      const stepScale = originScale / displayLenght

      const radPow = 1
      const radiusPow = 0.5
      const scalePow = 0.95
      const stepScroll = this.scrollTop / this.scrollSpeed

      const index = stepScroll < this.offsetIndex + this.index ? this.offsetIndex + this.index - stepScroll : 0

      const scrollScale = 0
      let scale = originScale - Math.pow(index, scalePow) * stepScale + scrollScale
      scale = scale < 0 ? 0 : scale

      const rad = (2 * Math.PI * originDeg) / 360 - Math.pow(index, radPow) * ((2 * Math.PI * stepDeg) / 360)

      const x = (originRadius - Math.pow(index, radiusPow) * stepRadius) * Math.cos(rad) * 0.5
      const y = (originRadius - Math.pow(index, radiusPow) * stepRadius) * Math.sin(rad) * 0.6

      return {
        x: x,
        y: y,
        scale: scale
      }
    },
    featuredImage() {
      if (this.article && this.article.images && this.article.images[0]) {
        const featuredImage = this.article.images[0]
        return featuredImage.sizes.large || featuredImage.sizes.full || false
      } else {
        return { height: 0, width: 0 }
      }
    }
  }
}
</script>
