"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "hd-theme";

type Theme = "light" | "dark" | "system";

const applyThemeClass = (theme: Theme) => {
  const root = document.documentElement;
  const isDark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  root.classList.toggle("dark", isDark);
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_KEY) as Theme | null;
    if (stored) {
      setTheme(stored);
      applyThemeClass(stored);
    } else {
      applyThemeClass("system");
    }
  }, []);

  useEffect(() => {
    const handler = () => applyThemeClass(theme);
    const matcher = window.matchMedia("(prefers-color-scheme: dark)");
    matcher.addEventListener("change", handler);
    return () => matcher.removeEventListener("change", handler);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, theme);
    applyThemeClass(theme);
  }, [theme]);

  return <div data-theme={theme}>{children}</div>;
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>("system");
  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_KEY) as Theme | null;
    if (stored) {
      setTheme(stored);
    }
  }, []);
  return { theme, setTheme };
};
