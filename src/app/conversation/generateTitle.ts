import { fetchAndDecode } from "@app/chat/fetchAndDecode";
import { Conversation } from "@stores/conversation";

export const generateTitle = async (
  conversation: Conversation
): Promise<string> => {
  const messageText = conversation.messages
    .map((message) => message.messages.join(" "))
    .join(" ");
  const prompt = `Generate a 3 to 10 word title for the conversation between the two delimiters (%%%):

%%%
${messageText}
%%%

Generated title:`;

  const buffer = await fetchAndDecode(prompt);
  const title = buffer.split("\n")[0].trim();

  return title;
};
