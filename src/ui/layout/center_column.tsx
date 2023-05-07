import { PropsWithChildren } from "react";

function CenterColumn({ children }: PropsWithChildren) {
  return (
    <main className="flex-1" id="chat-scroll-container">
      {children}
      {/*
       * Keeps the scroll at the bottom of the chat
       *
       * See globals.css & https://css-tricks.com/books/greatest-css-tricks/pin-scrolling-to-bottom/
       */}
      <div id="keep-scroll-at-bottom-anchor" />
    </main>
  );
}

export default CenterColumn;
