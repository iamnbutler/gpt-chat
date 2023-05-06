'use client';
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { ConversationHistoryItem, useConversationHistoryStore } from "./history";
import { useCallback } from "react";

export default function ConversationLink({ conversation }: { conversation: ConversationHistoryItem }) {
    const relativeTime = formatDistanceToNow(new Date(conversation.date), { addSuffix: true });
    const date = conversation.date.toLocaleDateString()

    const currentConversation = useConversationHistoryStore((state) => state.currentConversation);
    const current = currentConversation?.id === conversation.id;

    const setCurrentConversation = useConversationHistoryStore((state) => state.setCurrentConversation);

    const handleClick = useCallback(() => {
        setCurrentConversation(conversation.id);
    }, [conversation.id, setCurrentConversation]);

    return (
        <div
            onClick={handleClick}
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    handleClick();
                }
            }}
            tabIndex={0}
            role="button"
            aria-pressed={current}
            className={cn(
                'flex flex-col',
                'space-y-1',
                'py-2 px-4',
                current ? 'bg-amber-500/10' : 'bg-transparent',
                'text-white/70',
                'hover:cursor-pointer'
            )}
        >
            <h3 className={cn(conversation.unread ? 'text-bold' : 'text-regular', 'text-white')}>{conversation.title}</h3>
            <time dateTime={date}>{relativeTime}</time>
            <ul className="flex space-x-1 text-xs truncate text-white/40">
                {conversation.tags.map((tag, index) => (
                    <li key={tag}>
                        {tag}
                        {index < conversation.tags.length - 1 ? ', ' : ''}
                    </li>
                ))}
            </ul>
        </div>
    );
}
