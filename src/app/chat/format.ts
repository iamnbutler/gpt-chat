export async function parseStreamToLines(stream: ReadableStream<Uint8Array>): Promise<string[]> {
    const lines: string[] = [];
    let buffer = '';

    const reader = stream.getReader();
    const decoder = new TextDecoder();

    while (true) {
        const { done, value } = await reader.read();

        if (done) {
            if (buffer.length > 0) {
                lines.push(buffer);
            }
            break;
        }

        buffer += decoder.decode(value, { stream: true });

        let newlineIndex;
        while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
            lines.push(buffer.slice(0, newlineIndex));
            buffer = buffer.slice(newlineIndex + 1);
        }
    }

    return lines;
}
