import { create } from "zustand";

export type MessageRole = "user" | "assistant";

export interface Message {
  role: MessageRole;
  messages: string[];
}

const iniitalMessage: Message = {
  role: "assistant",
  messages: ["## Hello, how can I help you?"],
};

type MessageStore = {
  messages: Message[];
  addMessage: (message: Message) => void;
};

export const useMessageStore = create<MessageStore>((set, get) => ({
  messages: [iniitalMessage],
  addMessage: (message: Message) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },
}));
