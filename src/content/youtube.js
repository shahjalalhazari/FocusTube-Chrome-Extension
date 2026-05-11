/* global chrome */

const defaultSettings = {
  hideSuggestions: true,
  hideHomepage: true,
  hideShorts: true,
};

let currentSettings = defaultSettings;

function hideElements() {
  // SIDEBAR SUGGESTIONS
  const related = document.querySelector("#related");

  if (related) {
    related.style.display =
      currentSettings.hideSuggestions
        ? "none"
        : "";
  }

  // HOMEPAGE FEED
  const homepage = document.querySelector("ytd-rich-grid-renderer");

  if (homepage) {
    homepage.style.display =
      currentSettings.hideHomepage
        ? "none"
        : "";
  }

  // SHORTS
  const shorts = document.querySelectorAll(
    "ytd-reel-shelf-renderer"
  );

  shorts.forEach((short) => {
    short.style.display =
      currentSettings.hideShorts
        ? "none"
        : "";
  });
}

function initialize() {
  chrome.storage.sync.get(defaultSettings, (settings) => {
    currentSettings = settings;
    hideElements();

    const observer = new MutationObserver(() => {
      hideElements();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });

  chrome.storage.onChanged.addListener((changes) => {
    Object.keys(changes).forEach((key) => {
      currentSettings[key] = changes[key].newValue;
    });

    hideElements();
  });
}

initialize();