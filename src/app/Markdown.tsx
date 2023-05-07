import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

type HeadingProps = React.ComponentProps<"h1">;

const H1 = ({ children, ...props }: HeadingProps) => (
  <h1 className={cn("text-3xl text-slate-100 font-bold mb-2")} {...props}>
    {children}
  </h1>
);

const H2 = ({ children, ...props }: HeadingProps) => (
  <h2 className={cn("text-2xl text-slate-100 font-bold mb-2")} {...props}>
    {children}
  </h2>
);

const H3 = ({ children, ...props }: HeadingProps) => (
  <h3 className={cn("text-lg text-slate-100 font-bold mb-2")} {...props}>
    {children}
  </h3>
);

const H4 = ({ children, ...props }: HeadingProps) => (
  <h4 className={cn("text-md text-slate-100 font-bold mb-2")} {...props}>
    {children}
  </h4>
);

type InlineCodeProps = React.ComponentProps<"code">;

const InlineCode = ({ children, ...props }: InlineCodeProps) => (
  <code className="bg-slate-950/5 p-1 -mx-1" {...props}>
    {children}
  </code>
);

type LinkProps = React.ComponentProps<"a">;

const Link = ({ children, ...props }: LinkProps) => (
  <a
    className="underline-offset-4 decoration-slate-100/40 decoration-dotted hover:decoration-solid hover:decoration-slate-100"
    {...props}
  >
    {children}
  </a>
);

type CodeBlockProps = React.ComponentProps<"pre">;

const CodeBlock = ({ children, ...props }: CodeBlockProps) => (
  <pre className="bg-slate-950/5 border border-slate-950/10 p-1 -mx-1 my-1" {...props}>
    <code className="text-slate-100">{children}</code>
  </pre>
);

interface MarkdownProps {
  content: string;
}

const Markdown = React.memo(({ content }: MarkdownProps) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      h1: H1,
      h2: H2,
      h3: H3,
      h4: H4,
      a: Link,
      code: InlineCode,
      pre: CodeBlock,
    }}
  >
    {content}
  </ReactMarkdown>
));

Markdown.displayName = "Markdown";

export default Markdown;
