"use client";
import { cn } from "@/lib/utils";
import { Conversation, useConversationStore } from "@stores/conversation";
import { formatDistanceToNow } from "date-fns";
import { useCallback } from "react";

export default function ConversationLink({
  conversation,
}: {
  conversation: Conversation;
}) {
  const { currentConversation, setCurrentConversation } = useConversationStore(
    (state) => state
  );

  const relativeTime = formatDistanceToNow(new Date(conversation.date), {
    addSuffix: true,
  });
  const date = conversation.date.toLocaleDateString();

  const current = currentConversation?.id === conversation.id;

  const handleClick = useCallback(() => {
    setCurrentConversation(conversation.id);
  }, [conversation.id, setCurrentConversation]);

  return (
    <div
      onClick={handleClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          handleClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-pressed={current}
      className={cn(
        "flex flex-col",
        "space-y-1",
        "py-2 px-4",
        current ? "bg-amber-500/10" : "bg-transparent",
        "text-white/70",
        "hover:cursor-pointer"
      )}
    >
      <h3 className={cn("text-white")}>{conversation.title}</h3>
      <time dateTime={date}>{relativeTime}</time>
    </div>
  );
}
