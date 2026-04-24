"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

type ThemeProviderProps = Readonly<{
  children: ReactNode;
}>;

function applyTheme(theme: "light" | "dark") {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const syncTheme = () => {
      applyTheme(mediaQuery.matches ? "dark" : "light");
    };

    syncTheme();
    mediaQuery.addEventListener("change", syncTheme);

    return () => {
      mediaQuery.removeEventListener("change", syncTheme);
    };
  }, []);

  return <>{children}</>;
}
