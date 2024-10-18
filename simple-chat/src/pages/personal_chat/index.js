import styles from "./personal_chat.module.css"; 
import imgUrl from "../../public/avatar.png"; 
import createChatListPage from '../..'; 

const senderName = 'Я';

function addMessage(text, sender, time) {
    const messageElement = document.createElement('div');
    const messagesContainer = document.querySelector(`.${styles.messages}`);
    messageElement.classList.add(styles.message);
    messageElement.innerText = `${sender} (${time}): ${text}`;
    messagesContainer.appendChild(messageElement);
    messageElement.scrollIntoView({ behavior: 'smooth' });
}

function saveMessage(text, sender, time) {
    let messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push({ text, sender, time });
    localStorage.setItem('messages', JSON.stringify(messages));
}

function handleSubmit(event) {
    event.preventDefault();
    const input = document.querySelector(`.${styles["form-input"]} input`);
    const messageText = input.value;
    if (messageText.trim() !== '') {
        const currentTime = new Date().toLocaleTimeString();
        addMessage(messageText, senderName, currentTime);
        saveMessage(messageText, senderName, currentTime);
        input.value = '';
    }
}

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.forEach(message => {
        addMessage(message.text, message.sender, message.time);
    });
}

function onBack() {
    document.body.innerHTML = "";
    createChatListPage();
}

export function createPersonalChat() {
    const form = document.createElement('form');
    form.classList.add(styles.form);
    form.action = "/";

    const formHeader = document.createElement('header');
    formHeader.classList.add(styles["form__header"]);

    const backButton = document.createElement('span');
    backButton.classList.add('material-symbols-outlined');
    backButton.textContent = 'arrow_back';
    backButton.addEventListener('click', onBack);
    formHeader.appendChild(backButton);

    const avatar = document.createElement('img');
    avatar.id = 'avatar';
    avatar.src = imgUrl;
    avatar.classList.add(styles["avatar"])
    formHeader.appendChild(avatar);

    const article = document.createElement('article');
    const name = document.createElement('h5');
    name.textContent = 'челик';
    const status = document.createElement('h6');
    status.textContent = 'был 2 часа назад';
    article.appendChild(name);
    article.appendChild(status);
    formHeader.appendChild(article);

    const searchIcon = document.createElement('span');
    searchIcon.classList.add('material-symbols-outlined');
    searchIcon.textContent = 'search';
    formHeader.appendChild(searchIcon);

    const moreIcon = document.createElement('span');
    moreIcon.classList.add('material-symbols-outlined');
    moreIcon.textContent = 'more_vert';
    formHeader.appendChild(moreIcon);

    form.appendChild(formHeader);

    const messagesDiv = document.createElement('div');
    messagesDiv.classList.add(styles.messages);

    const othersMessage = document.createElement('div');
    othersMessage.classList.add(styles["others_message"]);

    const messageText = document.createElement('p');
    messageText.classList.add(styles["others_message__text"]);
    messageText.textContent = 'Есть над чем задуматься: непосредственные участники технического прогресса рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок.';
    othersMessage.appendChild(messageText);

    const messageTime = document.createElement('div');
    messageTime.classList.add(styles["others_message__time"]);
    messageTime.textContent = '04:20';
    othersMessage.appendChild(messageTime);

    messagesDiv.appendChild(othersMessage);
    form.appendChild(messagesDiv);

    const formInputDiv = document.createElement('div');
    formInputDiv.classList.add(styles["form-input"]);

    const messageInput = document.createElement('input');
    messageInput.name = 'message-text';
    messageInput.placeholder = 'Cообщение';
    messageInput.type = 'text';
    formInputDiv.appendChild(messageInput);

    const attachmentIcon = document.createElement('span');
    attachmentIcon.classList.add('material-symbols-outlined');
    attachmentIcon.textContent = 'attachment';
    formInputDiv.appendChild(attachmentIcon);

    form.appendChild(formInputDiv);
    document.body.appendChild(form);

    loadMessages();

    form.addEventListener('submit', handleSubmit);
    messageInput.addEventListener('keydown', function (event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    });
}
