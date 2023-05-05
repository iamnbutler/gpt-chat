import ConversationList from "@/app/conversations/conversationList";

function LeftColumn() {
    return (
        <aside className="sticky top-8 hidden w-[360px] shrink-0 lg:block">
            <ConversationList />
        </aside>
    );
}

export default LeftColumn;
