import "./globals.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="dark font-mono">
                <main className="flex min-h-screen font-mono text-sm">
                    {children}
                </main>
            </body>
        </html>
    );
}
