import { themes, Theme } from "./colors";
import { currentTheme } from "./store";

export function applyTheme(theme: Theme) {
  const selectedTheme = themes[theme];

  if (selectedTheme) {
    Object.entries(selectedTheme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value);
    });
    currentTheme.set(Theme[theme]);
  } else {
    console.error(`Theme "${Theme[theme]}" not found`);
  }
}
