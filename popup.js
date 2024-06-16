async function init() {
  document.getElementById("toggle").addEventListener("click", toggleDarkMode);
}

async function toggleDarkMode() {
  try {
    const port = await setupConection();
    port.postMessage({ action: "toggleDarkMode" });
  } catch (e) {
    document.getElementById("status").innerHTML = "Extension error";
    throw e;
  }
}

async function setupConection() {
  const [tab] = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });

  const port = browser.tabs.connect(tab.id, {
    name: "DarkModeMsg",
  });

  return port;
}

init();
