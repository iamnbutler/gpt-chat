import { PropsWithChildren } from "react";

export default function BaseLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="dark font-mono text-sm overscroll-none">{children}</body>
    </html>
  );
}
