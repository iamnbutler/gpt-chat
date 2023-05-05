import { PropsWithChildren } from "react";

function RightColumn({ children }: PropsWithChildren) {
  return (
    <aside className="sticky top-8 hidden w-96 shrink-0 xl:block">
      {children}
    </aside>
  );
}

export default RightColumn;
