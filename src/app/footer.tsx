import { cn } from "@/lib/utils";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const LinkButton = ({ href, children }: React.ComponentProps<"a">) => (
  <a
    href={href}
    className={cn(
      "text-white/60 hover:text-white",
      "text-sm font-medium",
      "rounded-xs",
      "border border-transparent hover:border-white/10",
      "py-1 px-2",
      "flex items-center gap-x-2"
    )}
  >
    {children}
  </a>
);

function Footer() {
  return (
    <header className="shrink-0 border-t border-white/10">
      <div className="mx-auto flex h-10 items-center justify-between px-4 sm:px-6 lg:px-8">
        <h1>GPT Chat</h1>
        <menu className="flex items-center gap-x-8" role="navigation">
          <LinkButton href="https://github.com/iamnbutler/gpt-chat/issues">
            <GitHubLogoIcon /> Issues
          </LinkButton>
        </menu>
      </div>
    </header>
  );
}

export default Footer;
