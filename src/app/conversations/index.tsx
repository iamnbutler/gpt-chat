import { cn } from "@/lib/utils";
import ConversationLink from "./conversation";
import { useConversationHistoryStore } from "./history";

export default function Conversations() {
    const conversations = useConversationHistoryStore((state) => state.history);

    return (
        <div className="divide-y divide-dashed divide-white/5">
            <button className={cn('flex w-full', 'justify-between', 'py-2 px-4', 'text-white/70', 'hover:cursor-pointer  hover:text-white')}><span>New Conversation</span><span>+</span></button>
            {conversations.map((conversation, ix) => (
                <ConversationLink key={`${conversation}-${ix}`} conversation={conversation} />
            ))}
        </div>
    )
}
