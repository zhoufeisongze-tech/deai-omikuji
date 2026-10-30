# 今日の出会い運 おみくじWebページ

合コンで配る名刺のQRコードから開くことを想定した、スマートフォン向けの静的Webページです。

## 内容

- 「おみくじを引く」ボタン
- 大吉・中吉・凶のランダム表示
- 結果ごとのユーモアのあるコメント（各3種類）
- 結果表示後のLINE友だち追加ボタン
- スマートフォン、タブレット、PC対応
- 外部ライブラリ・外部サーバー処理なし

## ファイル構成

```text
omikuji-line/
├─ index.html    ページ本体
├─ styles.css    デザイン
├─ script.js     おみくじ動作とLINEリンク設定
└─ README.md     この説明書
```

## 最初に必ず行うこと：LINE友だち追加リンクの設定

### 1. 自分のLINEリンクをコピーする

スマートフォンのLINEアプリで、次の順に操作します。

1. LINEの「トーク」を開く
2. 画面上部の「＋」をタップ
3. 「マイQRコード」をタップ
4. 「リンクをコピー」をタップ

LINEの画面構成はバージョンにより多少異なる場合があります。公式案内：  
<https://guide.line.me/ja/friends-and-groups/add-qrurl.html>

### 2. `script.js` に貼り付ける

`script.js` をメモ帳などで開き、ファイル上部にある次の行を探します。

```js
const LINE_ADD_FRIEND_URL = "";
```

コピーしたURLを、半角のダブルクォーテーション `"` の間に貼り付けます。

```js
const LINE_ADD_FRIEND_URL = "ここに自分のLINE友だち追加URLを貼り付ける";
```

保存したら設定完了です。`https://line.me/...` または `https://lin.ee/...` で始まるURLだけを受け付けます。

### 未設定時の安全動作

初期状態ではURLが空欄です。この場合、結果画面のボタンは「LINEリンク準備中」と表示され、押しても別ページへ移動しません。架空のURLや他人のLINEへ誘導することはありません。

## パソコン上で確認する

最も簡単な確認方法は、`index.html` をダブルクリックしてブラウザで開くことです。

確認する項目：

1. 「おみくじを引く」を押すと結果が表示される
2. 「もう一度引く」で最初に戻る
3. 設定後のLINEボタンから、自分のプロフィールが開く
4. スマートフォンでもLINEボタンを試し、正しい自分のアカウントであることを確認する

公開前に、第三者にも一度リンク先を確認してもらうことをおすすめします。

## GitHub Pagesで無料公開する

GitHubの無料アカウントと、公開リポジトリを使う方法です。公開した内容はインターネット上の誰でも見られる状態になります。このフォルダーには個人情報や非公開資料を入れないでください。

### 1. 新しいリポジトリを作る

1. <https://github.com/> にログイン
2. 右上の「＋」から「New repository」を選ぶ
3. Repository nameに、例として `deai-omikuji` と入力
4. 公開範囲は「Public」を選択
5. 「Create repository」を押す

### 2. 4ファイルをアップロードする

1. 作成したリポジトリで「Add file」→「Upload files」を選ぶ
2. `index.html`、`styles.css`、`script.js`、`README.md` をアップロード
3. 画面下部の「Commit changes」を押す

ファイルはサブフォルダーに入れず、リポジトリの一番上に置いてください。

### 3. GitHub Pagesを有効にする

1. リポジトリ上部の「Settings」を開く
2. 左側の「Pages」を開く
3. 「Build and deployment」の「Source」で「Deploy from a branch」を選ぶ
4. Branchで `main`、フォルダーで `/(root)` を選ぶ
5. 「Save」を押す
6. 数分待って同じPages画面を再読み込みする

公開URLは通常、次の形です。

```text
https://GitHubのユーザー名.github.io/deai-omikuji/
```

公式案内：  
<https://docs.github.com/ja/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site>

## Canvaで公開URLをQRコードにする

URLが決まる前にQRコードを作らないでください。先に公開URLをスマートフォンで開き、ページとLINEボタンの両方を確認します。

### 無料で使える静的QRコードの作成

1. Canvaで名刺デザインを開く
2. 左側の「アプリ」を選ぶ
3. `QRコード` と検索する
4. 「Static QR Codes（静的QRコード）」を選ぶ
5. GitHub Pagesの公開URLを貼り付ける
6. 「保存」または「コードを生成」を押す
7. 名刺に配置し、大きさと余白を調整する

Canvaの静的QRコードはリンク先を後から変更できません。公開URLが変わった場合はQRコードを作り直し、名刺も再印刷する必要があります。公式案内：  
<https://www.canva.com/help/create-and-manage-qr-codes/>

### 印刷前の最終確認

1. QRコードをスマートフォンのカメラで読み取る
2. 正しいおみくじページが開くことを確認
3. おみくじを引く
4. LINEボタンから正しい自分のプロフィールが開くことを確認
5. QRコードは小さくしすぎず、周囲に白い余白を残す
6. 本番印刷の前に、実寸で1枚テスト印刷して読み取る

## 結果やコメントを変更する

`script.js` 内の `fortunes` に、各結果とコメントがあります。文字列を変更すれば表示内容を差し替えられます。

```js
{
  kanji: "大吉",
  label: "DAIKICHI",
  comments: [
    "ここにコメント1",
    "ここにコメント2",
    "ここにコメント3",
  ],
},
```

改行したい場所には `\n` を入れてください。

## 注意事項

- このページはアクセス履歴や個人情報を保存しません。
- LINEリンクを変更した場合は、`script.js` を更新してGitHubへ再アップロードしてください。
- URL自体が変わらなければ、ページ内容やLINEリンクを更新しても既存の静的QRコードはそのまま使えます。
- 名刺を大量印刷する前に、必ず実機で全体をテストしてください。
