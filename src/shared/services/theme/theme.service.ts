import { type Theme } from "./theme.type";

const theme_key = "theme";

export default class ThemeService {
  private _theme: Theme = "light";

  loadTheme() {
    const theme = localStorage.getItem(theme_key) as Theme;

    if (theme) {
      this._theme = theme;
    }

    const html = document.querySelector("html")!;
    html.classList.add(this._theme);
  }

  toggleTheme() {
    const theme =
      localStorage.getItem(theme_key) === "light" ? "dark" : "light";
    localStorage.setItem(theme_key, theme);
    this._switchTheme(theme);
  }

  private _switchTheme(newTheme: Theme) {
    if (typeof window === "undefined") return;

    const html = document.querySelector("html")!;

    html.classList.replace(this._theme, newTheme);
    this._theme = newTheme;
  }

  get theme() {
    return this._theme;
  }
}