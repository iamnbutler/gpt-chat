import React from 'react';
import { nanoid } from 'nanoid';
import { ConversationHistoryItem, useConversationHistoryStore } from './history';
import { useMessageStore } from '../chat/store';
import { cn } from '@/lib/utils';

function NewConversationButton() {
    const { resetMessages } = useMessageStore()
    const { addConversationHistoryItem, setCurrentConversation } = useConversationHistoryStore();

    const handleNewConversation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        resetMessages();

        const conversationHistoryItem: ConversationHistoryItem = {
            id: nanoid(),
            date: new Date(),
            messages: [],
            pinned: false,
            unread: false,
            title: 'New Conversation',
            tags: []
        };

        addConversationHistoryItem(conversationHistoryItem);
        setCurrentConversation(conversationHistoryItem.id);
    }

    return (
        <button
            className={cn('flex w-full', 'justify-between', 'py-2 px-4', 'text-white/70', 'hover:cursor-pointer  hover:text-white')}
            onClick={handleNewConversation}
        >
            <span>New Conversation</span>
            <span>+</span>
        </button>
    )
}

export default NewConversationButton;
