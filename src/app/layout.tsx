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

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abhishek Srivastav - Full Stack Developer",
  description: "Portfolio of Abhishek Srivastav, a Full Stack Web Developer building modern, scalable and high-performance web applications.",
  icons: {
    icon: "/profile.jpg",
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
            </div>
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
