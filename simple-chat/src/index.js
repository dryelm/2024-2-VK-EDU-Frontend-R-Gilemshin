import { createHeader } from './components/app-header/app-header';
import { createChatList } from './components/chat-list/chat-list';
import { createNewChatButton } from './components/new-chat/new-chat';
import './index.css';

export default function createChatListPage(){
    createHeader();
    createChatList();
    createNewChatButton();
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = ""
    createChatListPage();
});