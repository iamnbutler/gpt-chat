import { create } from "zustand";
import { produce } from "immer";

export type MessageRole = "user" | "assistant";

export interface Message {
  role: MessageRole;
  messages: string[];
}

export const INITIAL_MESSAGE: Message = {
  role: "assistant",
  messages: [
    "## New Conversation",
    "Send a message to start a converstation.",
    "Use the fine tuning controls on the right to adjust the types of responses you get.",
    "### How can I help you today?",
    'You can ask me a question, like "Can you explain the theory of relativity to me?"',
    'You can also ask me to assist you with specific tasks, like "Convert this JSON to a TSV."',
    "### Resources",
    "Talking with an AI assistant like me can require some specific prompting. Try reading a [prompt guide](https://www.freecodecamp.org/news/how-to-communicate-with-ai-tools-prompt-engineering/) or take a look at a [cheat sheet](https://docs.kanaries.net/articles/chatgpt-prompt-cheat-sheet)",
    "You can also check out a variety of user generated prompts at [promps.chat](https://prompts.chat/)",
  ],
};

type MessageStore = {
  messages: Message[];
  addMessage: (message: Message) => void;
  resetMessages: () => void;
};

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  addMessage: (message: Message) => {
    set(
      produce((draft) => {
        draft.messages.push(message);
      })
    );
  },
  resetMessages: () => {
    set({ messages: [] });
  },
}));
