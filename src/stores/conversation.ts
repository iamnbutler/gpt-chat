import { create } from "zustand";
import { produce } from "immer";
import { generateTitle } from "@app/conversation/generateTitle";
import { nanoid } from "nanoid";

export interface Conversation {
  id: string;
  date: Date;
  messages: ChatMessage[];
  title: string;
}

export type MessageAuthor = "user" | "assistant";

export interface ChatMessage {
  role: MessageAuthor;
  messages: string[];
}

type ConversationStore = {
  conversations: Conversation[];
  currentConversation: Conversation;
  addConversation: (item: Conversation) => void;
  removeConversation: (id: string) => void;
  updateConversation: (id: string, conversation: Conversation) => void;
  newConversation: () => void;
  setCurrentConversation: (id: string) => void;
  updateCurrentConversation: (conversation: Conversation) => void;
  generateConversationTitle: (conversation: Conversation) => Promise<void>;
  messages: () => ChatMessage[] | undefined;
  addMessage: (message: ChatMessage) => void;
  setMessages: (messages: ChatMessage[]) => void;
  resetMessages: () => void;
};

const BLANK_CONVERSATION: Conversation = {
  id: nanoid(),
  title: "Untitled Conversation",
  date: new Date(),
  messages: [],
};

export const useConversationStore = create<ConversationStore>((set, get) => ({
  conversations: [BLANK_CONVERSATION],
  currentConversation: BLANK_CONVERSATION,
  addConversation: (item: Conversation) =>
    set(
      produce((state) => {
        state.conversations.unshift(item);
      })
    ),
  removeConversation: (id: string) =>
    set(
      produce((state) => {
        state.conversations = state.conversations.filter(
          (item: Conversation) => item.id !== id
        );
      })
    ),
  updateConversation: (id: string, conversation: Conversation) =>
    set(
      produce((state) => {
        const index = state.conversations.findIndex(
          (item: Conversation) => item.id === id
        );
        if (index !== -1) {
          state.conversations[index] = {
            ...state.conversations[index],
            ...conversation,
          };
        }
      })
    ),
  newConversation: () => {
    set(
      produce((state) => {
        const conversation: Conversation = {
          id: nanoid(),
          date: new Date(),
          messages: [],
          title: "Untitled Conversation",
        };
        state.conversations.unshift(conversation);
        state.currentConversation = conversation;
      })
    );
  },
  setCurrentConversation: (id: string) => {
    const conversations = get().conversations;
    const conversation = conversations.find((item) => item.id === id);
    if (conversation) {
      set({ currentConversation: conversation });
      get().setMessages(conversation.messages);
    } else {
      console.error("Invalid id, cannot set current conversation.");
    }
  },
  updateCurrentConversation: (conversation: Conversation) =>
    set({ currentConversation: conversation }),
  generateConversationTitle: async (conversation: Conversation) => {
    const generatedTitle = await generateTitle(conversation);
    const updatedConversation: Conversation = {
      ...conversation,
      title: generatedTitle,
    };
    set(
      produce((state) => {
        const index = state.conversations.findIndex(
          (item: Conversation) => item.id === conversation.id
        );
        if (index !== -1) {
          state.conversations[index] = updatedConversation;
        }
      })
    );
  },
  messages: () => {
    const currentConversation = get().currentConversation;
    return currentConversation ? currentConversation.messages : undefined;
  },
  addMessage: (message: ChatMessage) => {
    set(
      produce((state) => {
        state.currentConversation.messages.push(message);
      })
    );
  },
  setMessages: (messages: ChatMessage[]) => {
    set(
      produce((state) => {
        state.currentConversation.messages = messages;
      })
    );
  },
  resetMessages: () => {
    set(
      produce((state) => {
        state.currentConversation.messages = [];
      })
    );
  },
}));
