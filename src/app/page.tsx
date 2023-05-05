'use client'
import { cn } from "@/lib/utils";
import { useState } from "react";

function Home() {
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const [response, setResponse] = useState<String>("");

    const prompt = `${input} Use markdown to format your reply.`;

    const generateResponse = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setResponse("");
        setLoading(true);

        const response = await fetch("/chat/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt,
            }),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // This data is a ReadableStream
        const data = response.body;
        if (!data) {
            return;
        }

        const reader = data.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
            const { done, value } = await reader.read();

            if (done) {
                if (buffer.length > 0) {
                    setResponse((prev) => prev + buffer);
                }
                break;
            }

            buffer += decoder.decode(value, { stream: true });

            let newlineIndex;
            while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
                const line = buffer.slice(0, newlineIndex);
                setResponse((prev) => prev + line + '\n');
                buffer = buffer.slice(newlineIndex + 1);
            }
        }
        setLoading(false);
    };

    return (
        <div className="flex w-full">
            <div className="flex flex-col grow-0 space-y-4 text-primary w-[720px] py-16 mx-auto">
                <div className="px-4">
                    <p>How can I help you?</p>
                </div>

                {loading && (
                    <div role="status">
                        <svg aria-hidden="true" className="inline w-4 h-4 text-black/10 animate-spin dark:text-white/10 fill-white/50" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                )}

                {response && (
                    <div className="border-t border-b border-white/10 p-4 transition">
                        {response}
                    </div>
                )}
            </div>
            <div className="flex flex-col w-[520px] space-y-2 p-2">
                <textarea
                    className={cn(
                        "flex flex-grow w-full rounded-xs border border-white/20 bg-transparent px-4 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50")}
                    placeholder="Send a message"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    autoFocus
                    wrap="off"
                />
                <button
                    disabled={loading}
                    className={cn('border border-white/20', 'h-10 py-2 px-4 rounded-xs', loading && 'cursor-not-allowed', !loading && 'hover:bg-white/10')}
                    type="button"
                    onClick={(e) => generateResponse(e)}
                >
                    {!loading ? <span>Submit &rarr;</span> : <span className="text-white/50">Streaming...</span>}
                </button>
            </div>
        </div>
    )
}

export default Home;
