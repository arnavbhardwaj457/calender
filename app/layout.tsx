import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Wall Calendar Studio",
  description:
    "Interactive wall calendar with animated range selection, themed hero imagery, and notes per date range."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
