import { PropsWithChildren } from "react";
import Header from "./header";

function Main({ children }: PropsWithChildren) {
    return (
        <main className="flex flex-col flex-1">
            <div className="flex min-h-full flex-col">
                <Header />
                <div className="mx-auto flex w-screen items-start p-4 gap-4">
                    {children}
                </div>
            </div>
        </main>
    );
}

export default Main;
