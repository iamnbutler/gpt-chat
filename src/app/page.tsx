"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Spinner from "@/ui/spinner";
import { StreamDisplay } from "@/ui/stream";
import { INITIAL_CHAT_MESSAGE } from "@data/initial_chat_message";
import { Message } from "@app/message";
import ConversationList from "@app/conversation/conversationList";
import Footer from "./footer";
import { useConversationStore } from "@stores/conversation";

function Main() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState<string>("");
  const messages = useConversationStore((state) => state.messages());
  const currentConversation = useConversationStore(
    (state) => state.currentConversation
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      generateResponse(input);
    }
  };

  const generateResponse = async (input: string) => {
    setLines([]);
    setCurrentLine("");
    setLoading(true);

    useConversationStore.getState().addMessage({
      role: "user",
      messages: [input],
    });

    const prompt = `${input}

Use markdown to format your reply, unless I specifed otherwise above.`;

    const response = await fetch("/api/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    console.log(JSON.stringify(response.type, null, 2));

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
    let streamedLines: string[] = [];

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        if (buffer.length > 0) {
          setLines((prev) => [...prev, buffer]);
          streamedLines.push(buffer); // add the latest line to the streamedLines array
        }
        break;
      }

      buffer += decoder.decode(value, { stream: true });

      let newlineIndex;
      while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
        const line = buffer.slice(0, newlineIndex);
        setLines((prev) => [...prev, line]);
        streamedLines.push(line); // add the latest line to the streamedLines array
        buffer = buffer.slice(newlineIndex + 1);
      }

      setCurrentLine(buffer);
    }

    setCurrentLine(""); // Clear the currentLine after parsing the last line

    useConversationStore.getState().addMessage({
      role: "assistant",
      messages: streamedLines,
    });

    setLoading(false);
  };

  function DebugPrompts() {
    return (
      <div className="flex-shrink pt-4 mt-4 border-slate-100/20 border-t items-start">
        <h3>Debug Prompts</h3>
        <button
          className="text-slate-100/70 hover:text-slate-100"
          type="button"
          onClick={() => generateResponse("Generate a markdown testing file")}
        >
          Test Markdown
        </button>

        <button
          className="text-slate-100/70 hover:text-slate-100"
          type="button"
          onClick={() => generateResponse("Tell me a 5 paragraph story")}
        >
          Tell me a 5 paragraph story
        </button>
        <button
          className="text-slate-100/70 hover:text-slate-100"
          type="button"
          onClick={() => generateResponse("What is the simulation theory?")}
        >
          What is the simulation theory?
        </button>
        <button
          className="text-slate-100/70 hover:text-slate-100"
          type="button"
          onClick={() => generateResponse("Give me 3 10-30 word jokes")}
        >
          Give me 3 short jokes
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen app-grid gap-px bg-slate-700 overflow-hidden">
      <aside className="bg-slate-900 shrink-0 grid-sidebar h-full overflow-scroll-y p-4">
        <ConversationList />
      </aside>
      <main className="bg-slate-900 grid-chat flex flex-col overflow-y-scroll" id="chat-scroll-container">
        <header className="top-0 sticky bg-slate-900/90 p-4 h-10 border-b border-slate-100/10 flex justify-between items-center">
          <div>
            <h2>{currentConversation.title}</h2>
          </div>
          <div>
            <p className="text-slate-100/70">{currentConversation.messages.length}M</p>
          </div>
          {loading && <Spinner />}
        </header>

        <div className="p-4">
          <div className="flex flex-col text-slate-100" >

            {!loading && currentConversation.messages.length === 0 && (
              <Message message={INITIAL_CHAT_MESSAGE} />
            )}

            {messages?.map((message, ix) => (
              <Message key={ix + "-key"} message={message} />
            ))}

            {loading && (
              <StreamDisplay lines={lines} currentLine={currentLine} />
            )}
            {/* <section className="bg-red-500/10 border border-red-500/50 p-2 space-y-4">
              <pre>
                <code>{JSON.stringify(lines, null, 2)}</code>
              </pre>
              <pre>
                <code>{JSON.stringify(currentLine, null, 2)}</code>
              </pre>
            </section> */}
          </div>
          <div id="keep-scroll-at-bottom-anchor" />
        </div>
      </main>
      <aside className="bg-slate-900 grid-composer flex flex-col flex-grow justify-between h-full p-4">
        <div className="flex flex-col flex-grow h-full space-y-2">
          <textarea
            className={cn(
              "flex flex-grow w-full rounded-xs border border-slate-100/20 bg-transparent px-4 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-100/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            )}
            placeholder="Send a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button
            disabled={loading}
            className={cn(
              "text-slate-100/70",
              "flex justify-between",
              "border border-slate-100/20",
              "py-2 px-4",
              loading && "cursor-not-allowed",
              !loading && "hover:text-slate-100"
            )}
            type="button"
            onClick={() => generateResponse(input)}
          >
            {!loading ? (
              <>
                <span>Submit</span>
                <span className="opacity-70">⌘⏎</span>
              </>
            ) : (
              <span className="text-slate-100/50">Streaming...</span>
            )}
          </button>
        </div>
        <DebugPrompts />
      </aside>
      <Footer className="grid-footer bg-slate-900	shrink-0" />
    </div>
  );
}

export default Main;
