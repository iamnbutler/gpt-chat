'use client'
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Spinner from "@/ui/spinner";
import { MessageDisplay } from "@/ui/message";
import { StreamDisplay } from "@/ui/stream";
import { useMessageStore } from "./chat/store";

function Home() {
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const [lines, setLines] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState<string>("");

    const { messages, addMessage } = useMessageStore();

    useEffect(() => {
        addMessage({
            role: 'assistant',
            messages: ['## Hello, how can I help you?'],
        });
    }, [addMessage]); // only run once, when the component mounts

    const prompt = `${input} Use markdown to format your reply.`;

    const generateResponse = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLines([]);
        setCurrentLine("");
        setLoading(true);

        useMessageStore.getState().addMessage({
            role: 'user',
            messages: [input],
        });

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
                    setLines((prev) => [...prev, buffer]);
                }
                // Store the array of lines as an assistant message
                useMessageStore.getState().addMessage({
                    role: 'assistant',
                    messages: lines,
                });
                break;
            }

            buffer += decoder.decode(value, { stream: true });

            let newlineIndex;
            while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
                const line = buffer.slice(0, newlineIndex);
                setLines((prev) => [...prev, line]);
                buffer = buffer.slice(newlineIndex + 1);
            }

            setCurrentLine(buffer);
        }

        setCurrentLine(""); // Clear the currentLine after parsing the last line
        setLoading(false);
    };

    return (
        <div className="flex w-screen h-screen relative overflow-hidden">
            {loading && <Spinner />}
            <div className="w-full p-2 mx-auto overflow-y-scroll m-2 border border-white/20">
                <div className="w-[720px] flex flex-col grow-0 text-primary divide divide-y-white/10">
                    {messages.map((message, ix) => (
                        <MessageDisplay key={ix + "-key"} message={message} />
                    ))}

                    {(currentLine || lines) && (
                        <StreamDisplay lines={lines} currentLine={currentLine} />
                    )}
                </div>
            </div>
            <div className="flex flex-col w-[520px] space-y-2 p-2">
                <textarea
                    className={cn(
                        "flex flex-grow w-full rounded-xs border border-white/20 bg-transparent px-4 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50")}
                    placeholder="Send a message"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    autoFocus
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
