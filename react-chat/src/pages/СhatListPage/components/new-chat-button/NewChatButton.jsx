import styles from './new-chat.module.css'
import {Edit} from "@mui/icons-material";
export function NewChatButton({openModal}) {
    return (
        <button className={styles.add_chat_button} onClick={openModal}>
            <Edit className={styles.blackIcon}></Edit>
        </button>
    );
}