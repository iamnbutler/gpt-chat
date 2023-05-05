import { PropsWithChildren } from "react";
import Header from "./header";

function Main({ children }: PropsWithChildren) {
  return (
    <main className="flex flex-col flex-1">
      <div className="flex min-h-full flex-col">
        <Header />
        <div className="mx-auto flex w-full max-w-7xl items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </main>
  );
}

export default Main;
