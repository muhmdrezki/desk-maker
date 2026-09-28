import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Build your workspace · monis.rent",
  description:
    "Start from a bundle, make it yours, and we'll set it all up at your place in Bali tomorrow.",
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
