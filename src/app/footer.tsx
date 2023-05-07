import { cn } from "@/lib/utils";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const LinkButton = ({ href, children }: React.ComponentProps<"a">) => (
  <a
    href={href}
    className={cn(
      "text-slate-100/60 hover:text-slate-100",
      "text-sm font-medium",
      "rounded-xs",
      "border border-transparent hover:border-slate-100/10",
      "py-1 px-2",
      "flex items-center gap-x-2"
    )}
  >
    {children}
  </a>
);

function Footer({ className }: { className?: string }) {
  return (
    <footer className={className}>
      <div className="mx-auto flex h-10 items-center justify-between px-4 sm:px-6 lg:px-8">
        <h1>GPT Chat</h1>
        <menu className="flex items-center gap-x-8" role="navigation">
          <LinkButton href="https://github.com/iamnbutler/gpt-chat/issues">
            <GitHubLogoIcon /> Issues
          </LinkButton>
        </menu>
      </div>
    </footer>
  );
}

export default Footer;
