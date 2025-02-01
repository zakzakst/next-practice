## やること

- react-aria-components のコンポーネント一通り見る
  https://react-spectrum.adobe.com/react-aria/components.html
- テストコード書く
  https://github.com/adobe/react-spectrum/tree/main/packages/react-aria-components/test
- 下記みたいな書き方試す（props を受け取って利用する）
  https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/test/Button.test.js#L140
  https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/test/Button.test.js#L194

## 参考ページ

- https://react-spectrum.adobe.com/react-spectrum/index.html
- https://design.digital.go.jp/resources/
- https://open-props.style/

## 後回し

- react-area のフックを使ってみる
  https://zenn.dev/ryo_manba/articles/ccd0fddcb5e02c
  ⇒react-aria-components に対応している。まず、react-aria-components を利用して挙動などを理解してからでないと使いこなすのが難しそうだったため、後回し
- SCSS の変数を設定（下記参考にしてみる）
  - デジタル庁
  - open props
  - tailwind
- 下記とかを参考に各値を管理しやすい SCSS の記述意識する
  - https://github.com/material-components/material-web/tree/main/tokens
  - https://github.com/twbs/bootstrap/tree/main/scss
  - https://labo.webis.co.jp/2022/01/z-index-control/
- utility は styles で直接指定する？（関数用意しておいて、でも scss と二重管理になるか。。一応調べたり、試したりだけする？であれば一部だけ tailwind 導入とかでもいいか？実際の運用時だとスペース調整のためだけにクラス名設定するの手間。organisms（もしくは pages のコンテンツ） 以上で utility を利用できるとかもあり？でもコーディングルールが複雑になってしまうか？ であれば面倒だが自身でユーティリティクラスつくったほうがいい？）

## 所感

- ant design のスタイル、下記を利用して優先度のコントロールしようとしたが、クライアントコンポーネントでしか利用できなかった。
  https://ant.design/docs/react/compatible-style#layer
  もともと:where を利用して詳細度を下げて CSS を当てているため、そのままでもスタイルの上書きに不便はなさそうだった。
  https://developer.mozilla.org/ja/docs/Web/CSS/:where
- 他の react のコンポーネントライブラリも、そんなに CSS の詳細度挙げていない。現状@layer を積極的に利用したほうがいいと思われる場面は少なそう。
- レスポンシブは media query が多かった。以下の場合に自前の CSS を利用するとよさそう。
  - container query の利用が効果的なコンポーネント（molecules あたり？）
  - 複雑なレスポンシブ
- scss を利用すると、共通する値を typescript と連携することが難しい。
- tailwind と@layer の調整が上手くいかない（v4 の tailwind が@layer 使いやすくなった的な記事は見かけたので、バージョンアップすれば対応は簡単かもしれないが。。）

## 参考ページ（済）

- https://2024.stateofcss.com/ja-JP/tools/
- https://tech-education-nav.com/contents/educational-materials/scss-sass/scss-css-variables-integration
- https://zenn.dev/cybozu_frontend/articles/2528ad2935be9f
- https://developer.mozilla.org/ja/docs/Web/CSS/@layer
- aria-labelledby は要素にアクセシブル名を提供する短いテキストを参照します。 aria-describedby は説明を提供する詳しいコンテンツを参照するために使用します。
