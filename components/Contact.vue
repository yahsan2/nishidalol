<template>
  <section class="article-main contact typeset">
    <p>こんにちは！</p>
    <p>お仕事依頼ページを見ていただき、ありがとうございます。</p>
    <p>にしだけ夫婦はこれまでの２人の経験を活かして、<strong>WEB のクリエイティブ</strong>や、<strong>コミュニティー運営・組織づくり</strong>、<strong>オンラインの業務改善</strong>など、幅広くお仕事をしています。</p>
    <p>
      <img src="~assets/images/contact/profile-0.jpg" alt="" class="blend">
    </p>
    <p>インターネットを絡めて、面白いことをやっていきたい！でも、</p>
    <ul>
      <li>アイデアが浮かばない。。？</li>
      <li>実現の仕方がわからない。。？</li>
      <li>つくれる人がいない。。？</li>
    </ul>
    <p>そんな時、<strong>にしだけ夫婦</strong> は力を貸せるかもしれません！</p>
    <p>個人・法人に関わらず、お気軽にお問合せくださいね :D</p>


    <form name="contactform" method="POST" netlify>
      <div class="field">
        <label class="label">お名前</label>
        <div class="control has-icons-left has-icons-right">
          <input name="name" type="text" class="input is-success" placeholder="お名前">
        </div>
      </div>
      <div class="field">
        <label class="label">メールアドレス</label>
        <div class="control has-icons-left has-icons-right">
          <input type="email" name="email" class="input is-success"  placeholder="yahsan2@gmail.com">
        </div>
      </div>
      <div class="field">
        <label class="label">ご相談内容</label>
        <div class="control">
          <textarea name="message" class="textarea" placeholder=""></textarea>
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button type="submit" class="button is-link">送信</button>
        </div>
      </div>
    </form>

    <h2>にしだけのできること</h2>
    <p>にしだけは、大きくわけて３つの得意なコトがあります。</p>
    <ol>
      <li>WEB クリエイティブ</li>
      <li>コミュニティーづくり・運営</li>
      <li>オンラインの業務改善</li>
    </ol>
    <h3>実績・パートナー</h3>
    <ul>
      <li>
        NPO greenz　<a href="https://greenz.jp/" title="" target="_blank">https://greenz.jp</a><br>
        <small>WEBサイト構築・運用・改善</small>
      </li>
      <li>
        Developersjp　<a href="https://www.developersjp.online/" title="" target="_blank">https://www.developersjp.online</a><br>
        <small>エンジニア Slack コミュニティー運営</small>
      </li>
    </ul>
    <h3>詳細スキル</h3>
    <table>
      <thead>
        <tr>
          <th></th>
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
          <td>WEB デザイン<br>WEB 制作<br>WEB サービス</td>
          <td>
            <ul>
              <li>コーディング</li>
              <li>Nuxt.js / WordPress</li>
              <li>Rails / Node</li>
              <li>Sketch</li>
            </ul>
          </td>
          <td>
            <ul>
              <li>Photoshop</li>
              <li>Sketch</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>WEB 運用・改善</td>
          <td>
            <ul>
              <li>Google Analytics</li>
              <li>SEO</li>
            </ul>
          </td>
          <td>
            <ul>
              <li>イベントレポート</li>
              <li>写真撮影</li>
              <li>インタビュー記事作成</li>
              <li>画像・バナー作成</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>コミュニティー運営<br>組織づくり</td>
          <td>
            <ul>
              <li>Slack の運用</li>
              <li>Facebook Group の運用</li>
            </ul>
          </td>
          <td>
            <ul>
              <li>オンラインコミュニティ<br>オンラインサロン運営</li>
              <li>イベント運営サポート</li>
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
.blend
  // mix-blend-mode: multiply
  // background-blend-mode: multiply;

</style>