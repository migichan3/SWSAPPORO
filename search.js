document.addEventListener("DOMContentLoaded", () => {
  const nextButton = document.getElementById("next-screen");
  const searchButton = document.getElementById("search-button");
  const screen1 = document.getElementById("screen1");
  const screen2 = document.getElementById("screen2");

  // 1枚目から2枚目へ移動
  nextButton.addEventListener("click", () => {
    screen1.style.display = "none";
    screen2.style.display = "block";
  });

  // 検索ボタンを押したときの処理
  searchButton.addEventListener("click", () => {
    const selectedCategories = [];
    document.querySelectorAll(".category.selected").forEach((button) => {
      selectedCategories.push(button.textContent);
    });

    const duration = document.getElementById("duration").value;
    const params = new URLSearchParams();
    if (selectedCategories.length > 0) {
      params.append("categories", selectedCategories.join(","));
    }
    if (duration !== "-") {
      params.append("duration", duration);
    }

    // 結果ページに遷移
    window.location.href = `result.html?${params.toString()}`;
  });

  // カテゴリ選択の切り替え
  document.querySelectorAll(".category").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("selected");
    });
  });
});
