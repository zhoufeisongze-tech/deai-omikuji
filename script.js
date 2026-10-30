/*
 * ================================================================
 * LINEリンク設定箇所
 * 下の "" の中に、ご自身のLINE友だち追加URLを貼り付けてください。
 * 例: const LINE_ADD_FRIEND_URL = "https://line.me/ti/p/xxxxxxxx";
 * ================================================================
 */
const LINE_ADD_FRIEND_URL = "https://line.me/ti/p/2V77-NLQFf";

const fortunes = [
  {
    kanji: "大吉",
    label: "DAIKICHI",
    comments: [
      "目が合ったその瞬間、\n運命が二度見しています。",
      "今夜のあなたは主役級。\nただし乾杯のグラスは落とさないで。",
      "会話も笑顔も絶好調。\n連絡先交換までが遠足です。",
    ],
  },
  {
    kanji: "中吉",
    label: "CHUKICHI",
    comments: [
      "じわじわ好印象の予感。\n最初の一言は、天気以外で。",
      "焦らず話せば良いご縁。\n盛ったプロフィールはほどほどに。",
      "隣の席に小さなチャンス。\n聞き上手が今日の必勝技です。",
    ],
  },
  {
    kanji: "凶",
    label: "KYO",
    comments: [
      "今日は笑いを取れたら大勝利。\n黒歴史もいつかは鉄板ネタです。",
      "タイプの人は遠い席かも。\n席替えという名の神風を待ちましょう。",
      "第一印象で少し空回り。\n二周目からがあなたの本番です。",
    ],
  },
];

const introView = document.querySelector("#intro-view");
const resultView = document.querySelector("#result-view");
const drawButton = document.querySelector("#draw-button");
const retryButton = document.querySelector("#retry-button");
const resultKanji = document.querySelector("#result-kanji");
const resultLabel = document.querySelector("#result-label");
const resultComment = document.querySelector("#result-comment");
const lineButton = document.querySelector("#line-button");
const lineButtonText = document.querySelector("#line-button-text");
const lineStatus = document.querySelector("#line-status");
const confetti = document.querySelector("#confetti");

function isValidLineUrl(value) {
  if (!value) return false;

  try {
    const url = new URL(value);
    const isHttps = url.protocol === "https:";
    const isLineDomain = url.hostname === "line.me" || url.hostname === "lin.ee";
    return isHttps && isLineDomain;
  } catch {
    return false;
  }
}

function configureLineButton() {
  if (isValidLineUrl(LINE_ADD_FRIEND_URL)) {
    lineButton.href = LINE_ADD_FRIEND_URL;
    lineButton.target = "_blank";
    lineButton.classList.remove("is-disabled");
    lineButton.removeAttribute("aria-disabled");
    lineButtonText.textContent = "LINEで友だち追加";
    lineStatus.hidden = true;
    return;
  }

  lineButton.removeAttribute("href");
  lineButton.removeAttribute("target");
  lineButton.classList.add("is-disabled");
  lineButton.setAttribute("aria-disabled", "true");
  lineButtonText.textContent = "LINEリンク準備中";
  lineStatus.hidden = false;
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function showFortune() {
  const fortune = randomItem(fortunes);
  resultKanji.textContent = fortune.kanji;
  resultLabel.textContent = fortune.label;
  resultComment.textContent = randomItem(fortune.comments);

  introView.hidden = true;
  resultView.hidden = false;
  resultView.style.animation = "none";
  requestAnimationFrame(() => {
    resultView.style.animation = "";
    resultView.focus({ preventScroll: true });
  });

  launchConfetti(fortune.kanji === "大吉" ? 32 : 18);
}

function resetFortune() {
  resultView.hidden = true;
  introView.hidden = false;
  introView.style.animation = "none";
  requestAnimationFrame(() => {
    introView.style.animation = "";
    drawButton.focus({ preventScroll: true });
  });
}

function launchConfetti(amount) {
  const colors = ["#8f2641", "#c99a47", "#e4a8b6", "#f2d5a0"];
  confetti.replaceChildren();

  for (let i = 0; i < amount; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = randomItem(colors);
    piece.style.setProperty("--drift", `${Math.round(Math.random() * 140 - 70)}px`);
    piece.style.setProperty("--spin", `${Math.round(Math.random() * 540 + 180)}deg`);
    piece.style.animationDelay = `${Math.random() * 300}ms`;
    confetti.appendChild(piece);
  }

  window.setTimeout(() => confetti.replaceChildren(), 2300);
}

lineButton.addEventListener("click", (event) => {
  if (!isValidLineUrl(LINE_ADD_FRIEND_URL)) {
    event.preventDefault();
  }
});

drawButton.addEventListener("click", showFortune);
retryButton.addEventListener("click", resetFortune);
configureLineButton();
