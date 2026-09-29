"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import CustomCursor from "@/components/motion/CustomCursor";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem={true}
        disableTransitionOnChange={false}
      >
        <CustomCursor />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
