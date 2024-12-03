import styles from './new-chat.module.css'
import {Edit} from "@mui/icons-material";
export function NewChatButton() {
    return (
        <button className={styles.add_chat_button}>
            <Edit className={styles.blackIcon}></Edit>
        </button>
    );
}