import { ChatMessage } from "@stores/message";

export const INITIAL_CHAT_MESSAGE: ChatMessage = {
  role: "assistant",
  messages: ["## New Conversation", "Send a message to start a converstation."],
};
