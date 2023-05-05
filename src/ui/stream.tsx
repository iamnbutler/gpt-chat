import ReactMarkdown from "react-markdown";

interface StreamDisplayProps {
    lines: string[];
    currentLine: string;
}

export const StreamDisplay = ({ lines, currentLine }: StreamDisplayProps) => (
    <div className="p-4 prose dark:prose-invert prose-sm max-w-none">
        {lines.map((line, index) => (
            <ReactMarkdown key={index}>{line}</ReactMarkdown>
        ))}
        <p className="transition">{currentLine}</p>
    </div>
);
