document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search-button");
  const categoryButtons = document.querySelectorAll(".category");
  const optionsContainers = document.querySelectorAll(".options");

  // カテゴリボタンをクリックしたときの処理
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");
      optionsContainers.forEach(
        (container) => (container.style.display = "none")
      );
      document.getElementById(`${category}-options`).style.display = "block";
    });
  });

  searchButton.addEventListener("click", () => {
    // 選択されたチェックボックスの値を取得
    const selectedOptions = {};
    document.querySelectorAll(".options input:checked").forEach((input) => {
      const category = input.name;
      if (!selectedOptions[category]) {
        selectedOptions[category] = [];
      }
      selectedOptions[category].push(input.value);
    });

    // 所要時間の取得
    const duration = document.getElementById("duration").value;

    // クエリパラメータを作成
    const params = new URLSearchParams();
    Object.keys(selectedOptions).forEach((category) => {
      params.append(category, selectedOptions[category].join(","));
    });
    if (duration !== "-") {
      params.append("duration", duration);
    }

    // 結果ページに遷移
    window.location.href = `result.html?${params.toString()}`;
  });
});
