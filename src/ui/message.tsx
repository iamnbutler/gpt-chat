import { Message } from "@/app/chat/store";
import React from "react";
import ReactMarkdown from "react-markdown";

interface MessageDisplayProps {
    message: Message;
}

interface MessageDisplayProps {
    message: Message;
}

const MessageDisplayComponent = ({ message }: MessageDisplayProps) => (
    <div className="p-4">
        {message.messages.map((line, index) => (
            <ReactMarkdown key={index}>{line}</ReactMarkdown>
        ))}
    </div>
);

MessageDisplayComponent.displayName = "MessageDisplay";

export const MessageDisplay = React.memo(MessageDisplayComponent);
