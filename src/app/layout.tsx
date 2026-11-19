import type { Metadata } from "next";
import "./globals.css";
import { ReviewsProvider } from "@/components/ReviewsContext";

export const metadata: Metadata = {
  title: "NIK Salon | Beauty for Every Generation",
  description: "Beautiful hair experiences for little royals and grown-ups. Explore NIK Kids and NIK Adults.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ReviewsProvider>{children}</ReviewsProvider>
      </body>
    </html>
  );
}
