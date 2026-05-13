import type { Metadata } from "next";
import { Bebas_Neue, Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-cormorant",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: "/slash.png",
  },
  title: "Jeetu's Portfolio",
  description:
    "Full-stack developer from India, building fast, accessible, and obsessively well-crafted web & AI experiences. Open to full-time roles and freelance projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebas.variable} ${cormorant.variable} ${jetbrains.variable}`}
    >
      <body className="bg-void text-cream antialiased">
        <SmoothScroll>
          <PageTransition>
            <CustomCursor />
            <Navbar />
            {children}
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
