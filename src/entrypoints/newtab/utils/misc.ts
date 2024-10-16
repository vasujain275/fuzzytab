import { currentTheme } from "./store";

export function applyTheme(theme: Object) {
  console.log(theme);
  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--color-${key}`, value);
  });
  currentTheme.set(theme);
}
