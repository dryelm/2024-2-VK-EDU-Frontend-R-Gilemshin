import styles from '../../../../react-chat/src/pages/СhatListPage/components/new-chat-button/new-chat.module.css'

export function createNewChatButton(){
    const addButton = document.createElement('button');
    addButton.classList.add(styles["add_chat_button"]);
    const icon = document.createElement('span');
    icon.classList.add('material-symbols-outlined', styles["black-icon"]);
    icon.textContent = 'edit';
    addButton.appendChild(icon);
    document.body.appendChild(addButton);
}