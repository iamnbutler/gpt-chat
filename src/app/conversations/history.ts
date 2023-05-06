import { create } from "zustand";
import { Message, useMessageStore } from "../chat/store";
import { produce } from "immer";
import { INITIAL_CONVERSTATIONS } from "@/test_data/initial_conversations";


export interface Conversation {
    id: string;
    date: Date;
    messages: Message[];
}

export interface ConversationHistoryItem extends Conversation {
    pinned: boolean;
    unread: boolean;
    title: string;
    tags: string[];
}

type ConversationHistoryStore = {
    conversationHistory: ConversationHistoryItem[];
    addConversationHistoryItem: (item: ConversationHistoryItem) => void;
    removeConversationHistoryItem: (id: string) => void;
    updateConversation: (id: string, conversation: Conversation) => void;
    currentConversation: ConversationHistoryItem | null;
    updateCurrentConversation: (conversation: ConversationHistoryItem) => void;
    setCurrentConversation: (id: string) => void;
};

export const useConversationHistoryStore = create<ConversationHistoryStore>((set, get) => ({
    conversationHistory: INITIAL_CONVERSTATIONS,
    addConversationHistoryItem: (item: ConversationHistoryItem) =>
        set(produce((state) => {
            state.conversationHistory.unshift(item);
        })),
    removeConversationHistoryItem: (id: string) =>
        set(produce((state) => {
            state.conversationHistory = state.conversationHistory.filter((item: ConversationHistoryItem) => item.id !== id);
        })),
    updateConversation: (id: string, conversation: Conversation) =>
        set(produce((state) => {
            const index = state.conversationHistory.findIndex((item: ConversationHistoryItem) => item.id === id);
            if (index !== -1) {
                state.conversationHistory[index] = { ...state.conversationHistory[index], ...conversation };
            }
        })),
    currentConversation: null,
    updateCurrentConversation: (conversation: ConversationHistoryItem) =>
        set(produce((state) => { state.currentConversation = conversation; })),
    setCurrentConversation: (id: string) => {
        const conversation = get().conversationHistory.find((item) => item.id === id);
        if (conversation) {
            set(produce((state) => { state.currentConversation = conversation; }));
            const messages = conversation.messages;
            useMessageStore.getState().resetMessages();
            messages.forEach((message) => useMessageStore.getState().addMessage(message));
        } else {
            console.error("Invalid id, cannot set current conversation.");
        }
    },
}));
