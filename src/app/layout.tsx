"use client";

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark font-mono text-sm overscroll-none">{children}</body>
    </html>
  );
}
