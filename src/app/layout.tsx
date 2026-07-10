import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono, Cairo, Tajawal, Amiri } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { SiteShell } from "@/components/site-shell";
import { Analytics } from "@/components/analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

// Premium Arabic typography — Tajawal for body/UI, Cairo for display, Amiri for editorial headings
const tajawal = Tajawal({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["400", "500", "700", "800"],
});

const cairo = Cairo({
  variable: "--font-arabic-display",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const amiri = Amiri({
  variable: "--font-arabic-serif",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Snack Fruits — Premium IQF Fruits from Egypt to GCC Markets",
  description:
    "Snack Fruits is an Egypt-based IQF frozen fruits export company serving GCC importers, distributors, food factories and HoReCa partners with reliable supply, clear specifications and export-ready cold-chain handling.",
  keywords: [
    "IQF fruits Egypt",
    "frozen mango exporter",
    "IQF strawberry supplier",
    "frozen fruits GCC",
    "Snack Fruits",
    "B2B frozen fruits",
    "private label frozen fruits",
  ],
  authors: [{ name: "Snack Fruits Export Team" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Snack Fruits — Premium IQF Fruits from Egypt to GCC Markets",
    description:
      "Reliable supply, clear specifications, and export-ready cold-chain handling for GCC B2B buyers.",
    siteName: "Snack Fruits",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Snack Fruits — Premium IQF Fruits",
    description: "Premium IQF Fruits Exported from Egypt to GCC Markets",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${jetMono.variable} ${tajawal.variable} ${cairo.variable} ${amiri.variable} antialiased bg-background text-foreground font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <LanguageProvider>
            {children}
            <Toaster />
            <SonnerToaster position="top-center" richColors />
            <Analytics />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
