import "./globals.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <main className="flex min-h-screen flex gap-16 justify-center p-24 font-mono text-sm">
                    <section className="w-[540px]">
                        <div
                            className={`flex flex-col prose prose-sm dark:prose-invert max-w-none prose-pre:leading-none prose-code:leading-none
                        `}
                        >
                            {children}
                        </div>
                    </section>
                </main>
            </body>
        </html>
    );
}
