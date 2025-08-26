

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themeProvider";
import { TanQueryProvider } from "@/tanstackQuery";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Better Pogtime",
  description: "Better your Time, Pog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Neue+Montreal:wght@400;500;700&display=swap" rel="stylesheet" />
        {/* Critical CSS to prevent FOUC on animated elements */}
        <style dangerouslySetInnerHTML={{ __html: `.gsap-init{visibility:hidden}` }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider 
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TanQueryProvider>
            
             {children}
            
          </TanQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
