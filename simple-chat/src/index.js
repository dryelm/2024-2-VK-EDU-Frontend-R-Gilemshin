import './index.css';

const form = document.querySelector('form');
const input = document.querySelector('.form-input input');
const messagesContainer = document.querySelector('.messages');
import imgUrl from './public/avatar.png';
document.getElementById('avatar').src = imgUrl
const senderName = 'Я'; 

function addMessage(text, sender, time) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    //пока так, не хочу возится с модульностью без нормального шаблонизатора
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


form.addEventListener('submit', handleSubmit);


input.addEventListener('keydown', function (event) {
    if (event.keyCode === 13 && !event.shiftKey) { 
        event.preventDefault();
        form.dispatchEvent(new Event('submit'));
    }
});

window.addEventListener('DOMContentLoaded', loadMessages);
