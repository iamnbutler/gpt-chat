import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface StreamDisplayProps {
  lines: string[];
  currentLine: string;
}

export const StreamDisplay = ({ lines, currentLine }: StreamDisplayProps) =>
  lines.length > 0 || currentLine !== "" ? (
    <div
      className={cn(
        "p-4",
        "self-start",
        "max-w-2xl prose dark:prose-invert prose-sm"
      )}
    >
      {lines.map((line, index) => (
        <ReactMarkdown key={index}>{line}</ReactMarkdown>
      ))}
      <p className="transition">{currentLine}</p>
    </div>
  ) : (
    <></>
  );
