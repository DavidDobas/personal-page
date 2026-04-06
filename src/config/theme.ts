// ─── THEME CONFIG ────────────────────────────────────────────────────────────
//
// Fonts
//   Drop .woff2 / .ttf files into public/fonts/ and declare them with
//   @font-face in globals.css, then set the family name below.
//
// Colors
//   Set hex values for light and dark backgrounds/text.
// ─────────────────────────────────────────────────────────────────────────────

const theme = {
  font: {
    sans: "SourceSerif4, system-ui, sans-serif",
    mono: "'Geist Mono', monospace",
    name: "Bagnard, serif",
    postSize: "1.2rem",
  },
  light: {
    background: "#fffefb",
    foreground: "#171717",
  },
  dark: {
    background: "#0a0a0a",
    foreground: "#ededed",
  },
} as const;

export default theme;
