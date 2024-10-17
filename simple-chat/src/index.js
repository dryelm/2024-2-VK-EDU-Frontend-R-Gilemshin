import { createHeader } from './components/app-header/app-header';
import { createChatList } from './components/chat-list/chat-list';
import { createNewChatButton } from './components/new-chat/new-chat';
import './index.css';
import './components/chat-list/chat-list.css'

import imgUrl1 from './public/avatar.png';

export default function createChatListPage(){
    
    createHeader();
    createChatList();
    createNewChatButton();

    var avatars = document.getElementsByClassName('personal_chat__avatar');

    Array.from(avatars).forEach(element => {
        element.src = imgUrl1;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = ""
    createChatListPage();
});