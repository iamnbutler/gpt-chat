import { useEffect } from "react";
import {
  Conversation,
  ConversationHistoryItem,
  useConversationHistoryStore,
} from "./history";
import { useConversationBuilder } from "./useConversationBuilder";

export function AddConversationToHistory({
  conversation,
}: {
  conversation: Conversation;
}) {
  const { title, tags, loading } = useConversationBuilder(conversation);
  const addConversationHistoryItem = useConversationHistoryStore(
    (state) => state.addConversationHistoryItem
  );

  useEffect(() => {
    if (!loading) {
      const historyItem: ConversationHistoryItem = {
        ...conversation,
        pinned: false,
        unread: true,
        title,
        tags,
      };

      addConversationHistoryItem(historyItem);
    }
  }, [loading, conversation, title, tags, addConversationHistoryItem]);
}
