"use client";

import * as Layout from "@/ui/layout";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout.Base>{children}</Layout.Base>;
}
