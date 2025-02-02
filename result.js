const modal = document.getElementById("modal");
const modalHeader = document.getElementById("modalHeader");
const openModalBtn = document.getElementById("openModal");

let startY = 0;
let currentY = 0;
let lastY = 0;
let isDragging = false;
let velocity = 0;
let lastTime = 0;

// モーダルを開くボタン
openModalBtn.addEventListener("click", () => {
  modal.classList.add("show");
});

// モーダルの上部をタップしたら閉じる
modalHeader.addEventListener("click", () => {
  modal.classList.remove("show");
});

// スワイプ開始
modalHeader.addEventListener("touchstart", (event) => {
  startY = event.touches[0].clientY;
  lastY = startY;
  lastTime = Date.now();
  isDragging = true;
});

// スワイプ中
modalHeader.addEventListener("touchmove", (event) => {
  if (!isDragging) return;

  currentY = event.touches[0].clientY;
  let diff = currentY - startY;

  // モーダルを指に追従（制限付き）
  if (diff > 0) {
    modal.style.bottom = `-${Math.min(diff, 300)}px`; // 300px 以上は引っ張れない
  }

  // 速度を計算
  let now = Date.now();
  let timeDiff = now - lastTime;
  velocity = (currentY - lastY) / timeDiff;

  lastY = currentY;
  lastTime = now;
});

// スワイプ終了（スワイプ速度を考慮）
modalHeader.addEventListener("touchend", () => {
  isDragging = false;

  // 条件判定（速度 or 距離が一定を超えたら閉じる）
  if (velocity > 0.5 || currentY - startY > 100) {
    modal.classList.remove("show"); // 速いスワイプ or 100px 以上スワイプしたら閉じる
  } else {
    modal.classList.add("show"); // それ以外は開いたまま
  }

  // 位置をリセット
  modal.style.bottom = "0";
});
