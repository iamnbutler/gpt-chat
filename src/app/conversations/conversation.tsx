'use client';
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { ConversationHistoryItem } from "./history";

export default function ConversationLink({ conversation }: { conversation: ConversationHistoryItem }) {
    const relativeTime = formatDistanceToNow(new Date(conversation.date), { addSuffix: true });

    return (
        <div className={cn('flex flex-col', 'space-y-1', 'py-2 px-4', 'text-white/70', 'hover:cursor-pointer')}>
            <h3 className={cn(conversation.unread ? 'text-bold' : 'text-regular', 'text-white')}>{conversation.title}</h3>
            <time dateTime={conversation.date}>{relativeTime}</time>
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
