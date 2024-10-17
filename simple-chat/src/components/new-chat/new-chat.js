import styles from './new-chat.module.css'

export function createNewChatButton(){
    const addButton = document.createElement('button');
    addButton.classList.add(styles["add_chat_button"]);
    addButton.innerHTML = `<span class="material-symbols-outlined">edit</span>`;
    document.body.appendChild(addButton);
}