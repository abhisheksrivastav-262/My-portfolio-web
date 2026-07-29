import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { MouseGlow } from "@/components/ui/mouse-glow";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { PageTransition } from "@/components/ui/page-transition";
import { WhatsAppFloat } from "@/components/ui/whatsapp-float";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { ImagePreloader } from "@/components/ui/image-preloader";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  fallback: ["system-ui", "-apple-system", "Helvetica Neue", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Abhi Technologies - Premium Web Development Agency",
  description: "Professional websites, business websites, portfolio websites, e-commerce websites, landing pages and custom web applications built with modern technologies at affordable pricing. Starting at just ₹299.",
  icons: {
    icon: "/logo.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SmoothScroll>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              <ScrollProgress />
              <MouseGlow />
              <Navbar />
              <main className="flex-1">
                <PageTransition>
                  {children}
                </PageTransition>
              </main>
              <Footer />
              <WhatsAppFloat />
              <ScrollToTop />
              <ImagePreloader />
            </div>
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
