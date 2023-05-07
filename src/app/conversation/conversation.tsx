"use client";
import { cn } from "@/lib/utils";
import { Conversation, useConversationStore } from "@stores/conversation";
import { useCallback } from "react";

export default function ConversationLink({
  conversation,
}: {
  conversation: Conversation;
}) {
  const { currentConversation, setCurrentConversation } = useConversationStore(
    (state) => state
  );

  const current = currentConversation?.id === conversation.id;

  const handleClick = useCallback(() => {
    setCurrentConversation(conversation.id);
  }, [conversation.id, setCurrentConversation]);

  return (
    <div>
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
          "border",
          current
            ? "bg-amber-500/10 border-amber-500/20"
            : "border-transparent bg-transparent",
          "text-slate-100/70",
          "hover:cursor-pointer"
        )}
      >
        <h3 className={cn("text-slate-100")}>{conversation.title}</h3>
      </div>
    </div>
  );
}
