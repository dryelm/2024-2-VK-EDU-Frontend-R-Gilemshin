import './new-chat.css'

export function createNewChatButton(){
    const addButton = document.createElement('button');
    addButton.classList.add('add_chat_button');
    addButton.innerHTML = `<span class="material-symbols-outlined">edit</span>`;
    document.body.appendChild(addButton);
}