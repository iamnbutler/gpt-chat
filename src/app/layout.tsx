"use client";

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-mono text-sm text-slate-100 overscroll-none">{children}</body>
    </html>
  );
}
