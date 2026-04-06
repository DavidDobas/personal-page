import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import theme from "@/config/theme";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "David Dobas",
  description: "Robotics engineer. Writing about control systems, motors, and robots.",
};

const themeVars = `
  :root {
    --background: ${theme.light.background};
    --foreground: ${theme.light.foreground};
    --font-sans: ${theme.font.sans};
    --font-mono: ${theme.font.mono};
    --font-name: ${theme.font.name};
    --font-post-size: ${theme.font.postSize};
  }
  .dark {
    --background: ${theme.dark.background};
    --foreground: ${theme.dark.foreground};
  }
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.className} ${geistMono.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeVars }} />
      </head>
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="190e4739-8fd6-4f30-b5c3-afa23e7af9ff"
        strategy="afterInteractive"
      />
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <header className="fixed top-0 right-0 p-4 z-50">
            <ThemeToggle />
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
