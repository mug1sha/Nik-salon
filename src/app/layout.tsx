import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NIK Salon | Beauty for Every Generation",
  description: "Beautiful hair experiences for little royals and grown-ups. Explore NIK Kids and NIK Adults.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
