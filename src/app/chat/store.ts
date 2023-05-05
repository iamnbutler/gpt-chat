import { create } from 'zustand';

export type MessageRole = 'user' | 'assistant';

export interface Message {
    role: MessageRole;
    messages: string[];
}

type MessageStore = {
    messages: Message[];
    addMessage: (message: Message) => void;
};

export const useMessageStore = create<MessageStore>((set, get) => ({
    messages: [],
    addMessage: (message: Message) => {
        set((state) => ({
            messages: [...state.messages, message],
        }));
    },
}));
