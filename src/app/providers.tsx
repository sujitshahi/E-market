// app/providers.tsx
'use client'
import { ThemeProvider } from "next-themes";
import {HeroUIProvider} from '@heroui/react'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    
    <HeroUIProvider>
      <ThemeProvider>
      {children}
      </ThemeProvider>
    </HeroUIProvider>
  )
}