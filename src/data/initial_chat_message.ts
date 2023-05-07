import { ChatMessage } from "@stores/message";

export const INITIAL_CHAT_MESSAGE: ChatMessage = {
  role: "assistant",
  messages: ["Send a message to start a converstation."],
};
