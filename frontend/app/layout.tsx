import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Brief",
  description: "AI-Powered Content Summarization SaaS Product",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
