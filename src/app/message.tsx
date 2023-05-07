import { cn } from "@/lib/utils";
import React from "react";
import { ChatMessage } from "@stores/message";
import Markdown from "@app/Markdown";

const MessageComponent = ({ message }: { message: ChatMessage }) => {
  const isUserMessage = message.role === "user";

  return (
    <div
      className={cn(
        isUserMessage && "italic text-sky-100/70 self-end",
        "p-4",
        "max-w-2xl prose dark:prose-invert prose-sm"
      )}
    >
      {message.messages.map((line, index) => (
        <Markdown key={index} content={line} />
      ))}
    </div>
  );
};

MessageComponent.displayName = "Message";

export const Message = React.memo(MessageComponent);
