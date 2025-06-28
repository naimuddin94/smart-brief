import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/provider";

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
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
