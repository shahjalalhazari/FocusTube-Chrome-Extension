/* global chrome */
import { useEffect, useState } from "react";

const defaultSettings = {
  hideSuggestions: true,
  hideHomepage: true,
  hideShorts: true,
};

function Popup() {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    chrome.storage.sync.get(defaultSettings, (result) => {
      setSettings(result);
    });
  }, []);

  const handleToggle = (key) => {
    const updated = {
      ...settings,
      [key]: !settings[key],
    };

    setSettings(updated);

    chrome.storage.sync.set(updated);
  };

  return (
    <div className="w-80 min-h-72 bg-zinc-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-1">
        FocusTube
      </h1>

      <p className="text-gray-400 mb-3">
        Stay focused on intentional learning.
      </p>

      <div className="space-y-4">

        <Toggle
          label="Hide Suggestions"
          checked={settings.hideSuggestions}
          onChange={() => handleToggle("hideSuggestions")}
        />

        <Toggle
          label="Hide Homepage Feed"
          checked={settings.hideHomepage}
          onChange={() => handleToggle("hideHomepage")}
        />

        <Toggle
          label="Hide Shorts"
          checked={settings.hideShorts}
          onChange={() => handleToggle("hideShorts")}
        />

      </div>
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between bg-zinc-800 p-4 rounded-xl cursor-pointer">
      <span>{label}</span>

      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5"
      />
    </label>
  );
}

export default Popup;