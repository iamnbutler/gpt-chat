import React from "react";
import { nanoid } from "nanoid";
import { cn } from "@/lib/utils";
import { Conversation, useConversationStore } from "@stores/conversation";

function NewConversationButton() {
  const { resetMessages } = useConversationStore();
  const { addConversation, setCurrentConversation } = useConversationStore();

  const handleNewConversation = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    resetMessages();

    const conversation: Conversation = {
      id: nanoid(),
      date: new Date(),
      messages: [],
      title: "Untitled Conversation",
    };

    addConversation(conversation);
    setCurrentConversation(conversation.id);
  };

  return (
    <button
      className={cn(
        "flex w-full",
        "justify-between",
        "py-2 px-4",
        "text-white/70",
        "hover:cursor-pointer  hover:text-white"
      )}
      onClick={handleNewConversation}
    >
      <span>New Conversation</span>
      <span>+</span>
    </button>
  );
}

export default NewConversationButton;
