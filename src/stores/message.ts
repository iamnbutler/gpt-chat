import { create } from "zustand";
import { produce } from "immer";

export type MessageAuthor = "user" | "assistant";

export interface ChatMessage {
  role: MessageAuthor;
  messages: string[];
}

type MessageStore = {
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  setMessages: (messages: ChatMessage[]) => void;
  resetMessages: () => void;
};

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  addMessage: (message: ChatMessage) => {
    set(
      produce((draft) => {
        draft.messages.push(message);
      })
    );
  },
  setMessages: (messages: ChatMessage[]) => {
    set(
      produce((state) => {
        state.messages = messages;
      })
    );
  },
  resetMessages: () => {
    set({ messages: [] });
  },
}));
