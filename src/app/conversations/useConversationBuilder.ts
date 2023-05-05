import { useState, useEffect } from 'react';
import { Conversation } from './history';

const fetchAndDecode = async (prompt: string): Promise<string> => {
    const response = await fetch("/chat/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
        throw new Error("No data in response");
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
        const { done, value } = await reader.read();

        if (done) {
            break;
        }

        buffer += decoder.decode(value, { stream: true });
    }

    return buffer;
};

const generateTitle = async (conversation: Conversation): Promise<string> => {
    const messageText = conversation.messages.map((message) => message.messages.join(" ")).join(" ");
    const prompt = `Generate a title for this conversation:
\n\n
${messageText}
\n\n
The title should be between 3 and 10 words long.
\n\n
Title:`;

    const buffer = await fetchAndDecode(prompt);
    const title = buffer.split("\n")[0].trim();

    return title;
};

const generateTags = async (conversation: Conversation): Promise<string[]> => {
    const messageText = conversation.messages.map((message) => message.messages.join(" ")).join(" ");
    const prompt = `Generate an array of tags based off of this conversation:

${messageText}

What is the conversation about? Use that to generate tags.

For Example:

A conversation about optimizing a next.js site for search engines might have the following tags:
['next.js', 'seo']

A conversation about optimizing a react native app for performance might have the following tags:
['react-native', 'performance']

A conversation about learning how to garden might have the following tags:
['gardening', 'first-steps']

A conversation where the assistant tells the user a joke might have the following tags:
['joke', $joke-topic]

There should be 1 to 3 tags.

Return only the tags, in this format:

['tag1', 'tag2', 'tag3']

Tags:`;

    const buffer = await fetchAndDecode(prompt);
    const tags = buffer.trim().slice(1, -1).split(', ').map(tag => tag.slice(1, -1));

    return tags;
};

export function useConversationBuilder(conversation: Conversation) {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const generatedTitle = await generateTitle(conversation);
            const generatedTags = await generateTags(conversation);

            setTitle(generatedTitle);
            setTags(generatedTags);
            setLoading(false);
        };

        fetchData();
    }, [conversation]);

    return {
        title,
        tags,
        loading,
    };
}
