<template>
  <section class="article-main contact typeset">
    <p>こんにちは！</p>
    <p>
      お仕事依頼ページを見ていただき、ありがとうございます。
    </p>
    <p>
      にしだけ夫婦はこれまでの２人の経験を活かして、<strong
        >WEB のクリエイティブ</strong
      >や、<strong>コミュニティー運営・組織づくり</strong>、<strong>オンラインの業務改善</strong>など、幅広くお仕事をしています。
    </p>
    <div class="box">
      <ul>
        <li>
          <a href="#works">
            実績
          </a>
        </li>
        <li>
          <a href="#skill">
            スキル
          </a>
        </li>
      </ul>
    </div>
    <p>
      インターネットを絡めて、面白いことをやっていきたい！でも、
    </p>
    <ul>
      <li>
        アイデアが浮かばない。。？
      </li>
      <li>
        実現の仕方がわからない。。？
      </li>
      <li>つくれる人がいない。。？</li>
    </ul>
    <p>
      そんな時、<strong>にしだけ夫婦</strong>
      は力になることができます。
    </p>
    <p>
      個人・法人に関わらず、お気軽にお問合せください :D
    </p>
    <p>
      メール：<a href="mailto:family@nishida.lol">
        family@nishida.lol
      </a>
      <br />
      Twitter DM：<a href="https://twitter.com/nishidalol" target="_blank">
        https://twitter.com/nishidalol
      </a>
    </p>

    <no-ssr>
      <form name="contactform" method="post" netlify action="/thankyou">
        <input type="hidden" name="form-name" value="contactform" />
        <div class="field">
          <label class="label">
            お名前
          </label>
          <div class="control has-icons-left has-icons-right">
            <input
              v-model="contact.name"
              name="name"
              type="text"
              class="input is-success"
              placeholder="戸田恵梨香"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">
            メールアドレス
          </label>
          <div class="control has-icons-left has-icons-right">
            <input
              v-model="contact.email"
              type="email"
              name="email"
              class="input is-success"
              placeholder="todaerika@example.com"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">
            ご相談内容
          </label>
          <div class="control">
            <textarea
              v-model="contact.message"
              name="message"
              class="textarea"
              placeholder="ex.) 戸田恵梨香のオフィシャルホームページをつくりたいです。 / お金はないけど、3000kg の白米なら送りたいです。/ podcast ってどうはじめるんですか？ / 旅人になりたいです。 / リモートワークでの業務改善を教えてください。 / 夫婦仲良い秘訣をインタビューさせてください。 / greenz.jp のようなWEBマガジン作りたいです。 / WEB サービスつくりたいです。 など、お気軽になんでもお問い合わせください。"
            />
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button type="submit" class="button is-link">
              送信
            </button>
          </div>
        </div>
      </form>
    </no-ssr>

    <h2>にしだけのできること</h2>
    <p>
      にしだけは、大きくわけて３つの得意なコトがあります。
    </p>
    <ol>
      <li>WEB クリエイティブ</li>
      <li>
        コミュニティーづくり・運営
      </li>
      <li>オンラインの業務改善</li>
    </ol>
    <h3 id="works">
      実績・パートナー
    </h3>
    <ul>
      <li>
        NPO greenz
        <a href="https://greenz.jp/" title="" target="_blank">
          https://greenz.jp </a
        ><br />
        <small>WEBサイト構築・運用・改善</small>
      </li>
      <li>
        Developersjp
        <a href="https://www.developersjp.online/" title="" target="_blank">
          https://www.developersjp.online </a
        ><br />
        <small>エンジニア Slack コミュニティー運営</small>
      </li>
      <li>
        その他 nD inc. 所属
        <a href="http://ndinc.jp/" title="" target="_blank"> http://ndinc.jp </a
        ><br />
        <small>~ 2018 年３月まで </small>
      </li>
    </ul>
    <h3 id="skill">
      詳細スキル
    </h3>
    <table>
      <thead>
        <tr>
          <th />
          <th>宮本涼輔</th>
          <th>西田彩夏</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>企画・戦略</td>
          <td>
            <ul>
              <li>楽しいこと全般</li>
            </ul>
          </td>
          <td>
            <ul>
              <li>事例リサーチ</li>
              <li>マーケット調査</li>
              <li>新商品の企画</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>制作系</td>
          <td>
            <ul>
              <li>コーディング</li>
              <li>
                Nuxt.js / WordPress
              </li>
              <li>Rails / Node</li>
              <li>Sketch</li>
            </ul>
          </td>
          <td>
            <ul>
              <li>Photoshop</li>
              <li>Sketch</li>
              <li>写真撮影</li>
              <li>
                インタビュー記事作成
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>コミュニティー運営<br />組織づくり</td>
          <td>
            <ul>
              <li>
                オンラインサービス導入
              </li>
            </ul>
          </td>
          <td>
            <ul>
              <li>
                コミュニティマネージャー
              </li>
              <li>
                イベント運営サポート
              </li>
              <li>秘書業務</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style lang="stylus" scoped>
@import '~assets/style/settings'
@import '~assets/style/plugins/form'
.is-error
  color $color-red

.box
  // padding 1rem
  // background rgba(#fff, .5)
  margin-top $section-gap
  margin-bottom $section-gap
  border-radius .25rem
  h3
    margin-top 0
    font-size $fontsize-medium
    margin-bottom .5rem
    border-left none
    padding-bottom 0
    line-height 1
  ul
    margin 0
    padding 0
    li
      // display inline-block
      border-radius .25rem
      background rgba(#fff, .9)
      border-left .5rem solid $color-bg-contact1
      margin-left 0
      list-style-type none
      & + li
        // margin-left .5rem
        margin-top .5rem
      a
        padding .5rem 1rem
        display block
form
  margin-top 2rem
  // mix-blend-mode: multiply
  // background-blend-mode: multiply;
</style>

<script>
export default {
  data() {
    return {
      contact: {}
    }
  },
  methods: {
    async submit(e) {
      if (this.errorLength > 0) return false
      console.log(this.contact)
      const url = `${window.location.protocol}//${
        window.location.host
      }${e.target.getAttribute('action')}`
      console.log(url)
      const res = await this.$axios.post(url, JSON.stringify(this.contact))
      console.log(res)
    }
  }
}
</script>
