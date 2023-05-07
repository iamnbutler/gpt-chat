"use client";

import { useConversationStore } from "@stores/conversation";
import NewConversationButton from "./newConversation";
import ConversationLink from "./conversation";

export default function ConversationList() {
  const conversations = useConversationStore((state) => state.conversations);

  return (
    <div className="divide-y divide-dashed divide-white/10">
      <NewConversationButton />
      {conversations.map((conversation, ix) => (
        <ConversationLink
          key={`${conversation}-${ix}`}
          conversation={conversation}
        />
      ))}
    </div>
  );
}
