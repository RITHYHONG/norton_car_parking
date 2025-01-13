"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: string;
  enableSystem?: boolean;
  attribute?: 'class' | 'data-theme';
  value?: Record<string, string>;
  storageKey?: string;
  forcedTheme?: string;
  disableTransitionOnChange?: boolean;
}

export function ThemeProvider({
  children,
  attribute = 'class',
  defaultTheme = 'system',
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
