import ConversationLink from "./conversationHistoryItem";
import { useConversationHistoryStore } from "./history";
import NewConversationButton from "./newConversation";

export default function ConversationList() {
    const conversations = useConversationHistoryStore((state) => state.conversationHistory);

    return (
        <div className="divide-y divide-dashed divide-white/5">
            <NewConversationButton />
            {conversations.map((conversation, ix) => (
                <ConversationLink key={`${conversation}-${ix}`} conversation={conversation} />
            ))}
        </div>
    )
}
