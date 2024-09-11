import * as themes from "./colors";
import { currentTheme } from "./store";

export function applyTheme(themeName) {
  if (themes[themeName]) {
    Object.entries(themes[themeName]).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value);
    });
    currentTheme.set(themeName);
  } else {
    console.error(`Theme "${themeName}" not found`);
  }
}
