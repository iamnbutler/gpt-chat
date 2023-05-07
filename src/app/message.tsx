import { cn } from "@/lib/utils";
import React from "react";
import Markdown from "@app/Markdown";
import { ChatMessage } from "@stores/conversation";

const MessageComponent = ({ message }: { message: ChatMessage }) => {
  const isUserMessage = message.role === "user";

  const el = (
    <div
      className={cn(
        "p-4",
        "prose dark:prose-invert prose-sm"
      )}
    >
      {message.messages.map((line, index) => (
        <Markdown key={index} content={line} />
      ))}
    </div>
  )

  const m = isUserMessage
    ? (
      <div className="self-end my-2 w-4/5 bg-blue-500/10 border border-blue-500/20 shadow">{el}</div>
    )
    : (
      <div className="self-start my-2 w-4/5 bg-slate-950/5 border border-slate-100/20 shadow">{el}</div>
    )

  return m
};

MessageComponent.displayName = "Message";

export const Message = React.memo(MessageComponent);
