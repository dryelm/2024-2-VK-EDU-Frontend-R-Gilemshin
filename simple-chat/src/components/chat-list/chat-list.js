import { createPersonalChat } from '../../pages/personal_chat';
import './chat-list.css'

export function createChatList(){
    const chatList = [
        { avatar: '/public/avatar.png', 
            name: 'Дженнифер', 
            preview: 'Есть над чем задуматься: непосредственные участники технического прогресса рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок.', 
            time: '13:25', 
            status: 'done_all' 
        },
        { avatar: 'avatar.png', name: 'Дженнифер', preview: 'Есть над чем задуматься', time: '13:25', status: 'done' },
        
    ];
    
    const chatListHtml = document.createElement('ul');
    chatListHtml.classList.add('chat_list');
    chatList.forEach(chat => {
        const chatItem = document.createElement('li');
        chatItem.classList.add('personal_chat');
        chatItem.innerHTML = `
            <img class="personal_chat__avatar" />
            <h6 class="personal_chat__name">${chat.name}</h6>
            <p class="personal_chat__preview">${chat.preview}</p>
            <p class="personal_chat__time">${chat.time}</p>
            <span class="personal_chat__status material-symbols-outlined">${chat.status}</span>
        `;
    
        chatItem.addEventListener('click', () => {
            document.body.innerHTML = '';
            createPersonalChat();
        });
    
        chatListHtml.appendChild(chatItem);
    });

    document.body.appendChild(chatListHtml);
}