/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const React = require("react");

// Apply the saved (or OS-preferred) theme before first paint to avoid a
// flash of the wrong theme on load.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var dark = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (dark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

exports.onRenderBody = ({ setHtmlAttributes, setPreBodyComponents }) => {
  setHtmlAttributes({ lang: "en" });
  setPreBodyComponents([
    React.createElement("script", {
      key: "theme-init",
      dangerouslySetInnerHTML: { __html: themeInitScript },
    }),
  ]);
};
