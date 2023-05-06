"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Spinner from "@/ui/spinner";
import { MessageDisplay } from "@/ui/message";
import { StreamDisplay } from "@/ui/stream";
import { INITIAL_MESSAGE, useMessageStore } from "./chat/store";
import * as Layout from "@/ui/layout";

function Home() {
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const [lines, setLines] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState<string>("");

    const messages = useMessageStore((state) => state.messages);

    const prompt = `${input} Use markdown to format your reply.`;

    const generateResponse = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLines([]);
        setCurrentLine("");
        setLoading(true);

        useMessageStore.getState().addMessage({
            role: "user",
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
        let buffer = "";

        while (true) {
            const { done, value } = await reader.read();

            if (done) {
                if (buffer.length > 0) {
                    setLines((prev) => [...prev, buffer]);
                }
                // Store the array of lines as an assistant message
                useMessageStore.getState().addMessage({
                    role: "assistant",
                    messages: lines,
                });
                break;
            }

            buffer += decoder.decode(value, { stream: true });

            let newlineIndex;
            while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
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
        <Layout.Main>
            <Layout.LeftColumn />
            <Layout.CenterColumn>
                <div className="max-w-2xl mx-auto flex flex-col grow-0 text-primary divide divide-y-white/10 relative">
                    {loading && <Spinner />}
                    <MessageDisplay message={INITIAL_MESSAGE} />
                    {messages.map((message, ix) => (
                        <MessageDisplay key={ix + "-key"} message={message} />
                    ))}

                    {(currentLine || lines) && (
                        <StreamDisplay lines={lines} currentLine={currentLine} />
                    )}
                </div>
            </Layout.CenterColumn>
            <Layout.RightColumn>
                <div className="flex flex-col space-y-2">
                    <textarea
                        className={cn(
                            "flex flex-grow w-full rounded-xs border border-white/20 bg-transparent px-4 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                        placeholder="Send a message"
                        rows={10}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        autoFocus
                    />
                    <button
                        disabled={loading}
                        className={cn(
                            "text-white/70",
                            "flex justify-between",
                            "border border-white/20",
                            "py-2 px-4",
                            loading && "cursor-not-allowed",
                            !loading && "hover:text-white"
                        )}
                        type="button"
                        onClick={(e) => generateResponse(e)}
                    >
                        {!loading ? (
                            <><span>Submit</span> <span>&rarr;</span></>
                        ) : (
                            <span className="text-white/50">Streaming...</span>
                        )}
                    </button>
                </div>
            </Layout.RightColumn>
        </Layout.Main>
    );
}

export default Home;
