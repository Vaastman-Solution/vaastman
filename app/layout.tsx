import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./typography.css";
import { Toaster } from "sonner";
import { QueryProviders } from "@/components/query-provider";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vaastman Solutions — Digital Agency for Websites & Apps",
  description:
    "Vaastman Solutions is a full-stack digital agency building high-performance websites, web apps, and mobile experiences that deliver real results.",
  icons: {
    icon: "/vaastman-logo.jpg",
    shortcut: "/vaastman-logo.jpg",
    apple: "/vaastman-logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-mono">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProviders>
            <main>{children}</main>
          </QueryProviders>
        </ThemeProvider>
        <Toaster
          position="top-right"
          richColors
          closeButton
          theme="light"
          offset={{ top: "8px" }}
          mobileOffset={{ top: "6px" }}
        />
      </body>
    </html>
  );
}
