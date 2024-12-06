import { createPersonalChat } from '../../pages/personal_chat';
import styles from '../../../../react-chat/src/pages/СhatListPage/components/chat-list/chat-list.module.css'
import imgUrl from '../../../../react-chat/src/assets/avatar.png'

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
    chatList.forEach((chat, index) => {
        const chatItem = document.createElement('li');
        chatItem.classList.add(styles['personal_chat']);

        chatItem.appendChild(createAvatar(index === 0));
        chatItem.appendChild(createName(chat.name));
        chatItem.appendChild(createPreview(chat.preview));
        chatItem.appendChild(createTime(chat.time));
        chatItem.appendChild(createStatus(chat.status));

        chatItem.addEventListener('click', () => {
            document.body.innerHTML = '';
            createPersonalChat();
        });
    
        chatListHtml.appendChild(chatItem);
    });

    document.body.appendChild(chatListHtml);
}

function createAvatar(pulse = false) {
    const img = document.createElement('img');
    img.classList.add(styles['personal_chat__avatar']);
    img.classList.add(styles['pulse']);
    img.src = imgUrl;
    return img;
}

function createName(name) {
    const nameElement = document.createElement('h6');
    nameElement.classList.add(styles['personal_chat__name']);
    nameElement.textContent = name;
    return nameElement;
}

function createPreview(preview) {
    const previewElement = document.createElement('p');
    previewElement.classList.add(styles['personal_chat__preview']);
    previewElement.textContent = preview;
    return previewElement;
}

function createTime(time) {
    const timeElement = document.createElement('p');
    timeElement.classList.add(styles['personal_chat__time']);
    timeElement.textContent = time;
    return timeElement;
}


function createStatus(status) {
    const statusElement = document.createElement('span');
    statusElement.classList.add(styles['personal_chat__status'], 'material-symbols-outlined');
    statusElement.textContent = status; 
    return statusElement;
}