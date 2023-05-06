import { Message } from "@/app/chat/store";
import { cn } from "@/lib/utils";
import React from "react";
import Markdown from "@/app/message/Markdown";

interface MessageDisplayProps {
    message: Message;
}

interface MessageDisplayProps {
    message: Message;
}

const MessageDisplayComponent = ({ message }: MessageDisplayProps) => {
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

MessageDisplayComponent.displayName = "MessageDisplay";

export const MessageDisplay = React.memo(MessageDisplayComponent);
