import styles from './chat-list.module.css';
import {Link} from "react-router-dom";
import {AppRoutes} from "../../../../utils/types/AppRoutes.js";
import {LazyImage} from "../../../../components/LazyImage/LazyImage.jsx";

export function ChatList({chatList}) {
    return (
        <ul>
            {chatList.map((chat, index) => (
                <Link key={index} to={`${AppRoutes.Chat}/${chat.id}`}>
                    <li className={styles.personal_chat}>
                        <Avatar pulse={index === 0} avatarPath={chat.avatar} />
                        <Name name={chat.name} />
                        <Preview preview={chat.preview} />
                        <Time time={chat.time} />
                        <UnreadMessages unread_messages={chat.unread_messages} />
                    </li>
                </Link>
            ))}
        </ul>
    );
}

function Avatar({ avatarPath, pulse = false }) {
    return avatarPath ? <LazyImage className={`${styles.personal_chat__avatar} ${pulse ? styles.pulse : ''}`} src={avatarPath} alt="avatar" /> : <div></div>;
}

function Name({ name }) {
    return <h6 className={styles.personal_chat__name}>{name}</h6>;
}

function Preview({ preview }) {
    return <p className={styles.personal_chat__preview}>{preview}</p>;
}

function Time({ time }) {
    return <p className={styles.personal_chat__time}>{time}</p>;
}

function UnreadMessages({ unread_messages }) {
    if (unread_messages > 0) return <div className={styles.personal_chat__status}>{unread_messages}</div>;
    return <></>;
}


