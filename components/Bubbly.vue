<template>
  <canvas class="bubbly" id="bubbly">a</canvas>
</template>

<style lang="stylus" scoped>
@import '~assets/style/settings'

#bubbly
  position absolute
  top 0
  left 0
  width 100%
  height 100%

</style>

<script>

export default {
  components: {
  },
  props: {
  },
  data () {
    return {
      config: {
        animate: true, // default is true
        blur: 2, // default is 4
        bubbleFunc: () => `hsla(${Math.random() * 360}, 100%, 50%, ${Math.random() * 0.25})`, // default is () => `hsla(0, 0%, 100%, ${r() * 0.1})`)
        bubbles: 20, // default is Math.floor((canvas.width + canvas.height) * 0.02);
        canvas: document.querySelector('#background'), // default is created and attached
        colorStart: 'yellow', // default is blue-ish
        colorStop: 'cyan', // default is blue-ish
        compose: 'lighter', // default is 'lighter'
        shadowColor: '#fff', // default is #fff
        angleFunc: () => Math.random() * Math.PI * 2, // default is this
        velocityFunc: () => 0.1 + Math.random() * 0.5, // default is this
        radiusFunc: () => 4 + Math.random() * 1 // default is 4 + Math.random() * width / 25
      }
    }
  },
  computed: {
  },
  methods: {
    init () {
      const r = () => Math.random()
      this.canvas = this.config.canvas ? document.querySelector(this.config.canvasId) : document.getElementById('bubbly')
      this.width = this.canvas.width
      this.height = this.canvas.height
      if (this.canvas.parentNode === null) {
        this.canvas.setAttribute('style', 'position:fixedz-index:-1left:0top:0min-width:100vwmin-height:100vh')
        this.width = this.canvas.width = window.innerWidth
        this.height = this.canvas.height = window.innerHeight
        document.body.appendChild(this.canvas)
      }
      this.context = this.canvas.getContext('2d')
      this.context.shadowColor = this.config.shadowColor || '#fff'
      this.context.shadowBlur = this.config.blur || 4
      this.gradient = this.context.createLinearGradient(0, 0, 0, this.height)
      this.gradient.addColorStop(0, this.config.colorStart || 'yellow')
      this.gradient.addColorStop(1, this.config.colorStop || 'cyan')
      const nrBubbles = this.config.bubbles || Math.floor((this.width + this.height) * 0.02)
      this.bubbles = []
      for (let i = 0; i < nrBubbles; i++) {
        this.bubbles.push({
          f: (this.config.bubbleFunc || (() => `hsla(0, 0%, 100%, ${r() * 0.1})`)).call(), // fillStyle
          // x: 35 + 0.5 * this.width, // x-position
          // y: -5 + 0.5 * this.height, // y-position
          x: r() * this.width, // x-position
          y: r() * this.height, // y-position
          r: (this.config.radiusFunc || (() => 4 + r() * this.width / 25)).call(), // radius
          a: (this.config.angleFunc || (() => r() * Math.PI * 2)).call(), // angle
          v: (this.config.velocityFunc || (() => 0.1 + r() * 0.5)).call() // velocity
        })
      }
      this.draw()
    },
    draw () {
      if (this.canvas.parentNode === null) {
        return cancelAnimationFrame(this.draw)
      }
      if (this.config.animate !== false) {
        requestAnimationFrame(this.draw)
      }
      this.context.globalCompositeOperation = 'source-over'
      this.context.fillStyle = this.gradient
      this.context.fillRect(0, 0, this.width, this.height)
      this.context.globalCompositeOperation = this.config.compose || 'lighter'
      this.bubbles.forEach(bubble => {
        this.context.beginPath()
        this.context.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2)
        this.context.fillStyle = bubble.f
        this.context.fill()
        // update positions for next draw
        bubble.x += Math.cos(bubble.a) * bubble.v
        bubble.y += Math.sin(bubble.a) * bubble.v
        if (bubble.x - bubble.r > this.width) {
          bubble.x = -bubble.r
        }
        if (bubble.x + bubble.r < 0) {
          bubble.x = this.width + bubble.r
        }
        if (bubble.y - bubble.r > this.height) {
          bubble.y = -bubble.r
        }
        if (bubble.y + bubble.r < 0) {
          bubble.y = this.height + bubble.r
        }
      })
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
  }
}
</script>