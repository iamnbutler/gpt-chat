import {
    ChatCompletionRequestMessage,
    Configuration,
    CreateChatCompletionResponse,
    OpenAIApi,
} from "openai";

function buildSystemMessage(): ChatCompletionRequestMessage {
    return {
        role: "system",
        content: "You are a helpful assistant here to assist the user with their questions.",
    };
}

const formattingInstructions = ``;

async function buildMessages(message: ChatCompletionRequestMessage) {
    const systemMessage = buildSystemMessage();

    const finalMessageContent = `${formattingInstructions}

  ${message.content}`;

    message.content = finalMessageContent;

    const messages: ChatCompletionRequestMessage[] = [systemMessage, message];

    return messages;
}

export type Model = 'gpt-3.5-turbo' | 'gpt-4';

interface GetChatCompletionProps {
    messages: ChatCompletionRequestMessage[];
    model?: Model;
}

async function getChatCompletion({
    messages,
    model = 'gpt-3.5-turbo'
}: GetChatCompletionProps): Promise<CreateChatCompletionResponse> {
    try {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });

        if (!configuration.apiKey) {
            throw new Error("No OpenAI API key found");
        }

        const openai = new OpenAIApi(configuration);

        const chatCompletion = await openai.createChatCompletion({
            model: model,
            messages,
        });

        const log = `====
    Status: ${chatCompletion.status}
    Status Text: ${chatCompletion.statusText}
    Config: ${JSON.stringify(chatCompletion.config, null, 2)}
    Data: ${JSON.stringify(chatCompletion.data, null, 2)}
    ====`

        console.log(log)

        return chatCompletion.data;
    } catch (error) {
        console.error("Error in getChatCompletion:", error);

        const log = `====
      Error: ${JSON.stringify(error, null, 2)}
      ====`

        console.log(log)

        throw error;
    }
}

export {
    buildMessages,
    getChatCompletion
}
