import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avia Bakery",
  description: "Avia Bakery #1",
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
