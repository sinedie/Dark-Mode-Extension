function enable(updateLocalStorage = true) {
  setFilter("invert(100%) hue-rotate(180deg)");
  if (updateLocalStorage) localStorage.setItem("darkModeEnabled", true);
}

function disable(updateLocalStorage = true) {
  setFilter("");
  if (updateLocalStorage) localStorage.setItem("darkModeEnabled", false);
}

function setFilter(filter) {
  document.body.style.filter = filter;
  document.querySelectorAll("img").forEach((image) => {
    image.style.filter = filter;
  });
}

function init() {
  if (window.isDarkModeActive === true) return;
  window.isDarkModeActive = true;

  if (localStorage.getItem("darkModeEnabled") == "true") {
    enable(false);
  }

  (chrome ?? browser).runtime.onConnect.addListener((port) => {
    if (port.name !== "DarkModeMsg") return;

    port.onMessage.addListener((msg) => {
      if (msg.action === "toggleDarkMode") {
        localStorage.getItem("darkModeEnabled") !== "true"
          ? enable()
          : disable();
      }
    });
  });
}

init();
