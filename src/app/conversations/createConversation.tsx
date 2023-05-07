import { nanoid } from "nanoid";
import { Conversation } from "./history";
import { useMessageStore } from "../chat/store";

function useNewConversation() {
  // create a new conversation object (Conversation)
  // once the first user message is sent, and the first assistant message is received:
  // transform the conversation object into a conversation history object (ConversationHistoryItem)
  // add it to the conversation store
  // set it as the current conversation
}

function loadConversation() {
  // load the conversation from the store
  // set it as the current conversation
}
