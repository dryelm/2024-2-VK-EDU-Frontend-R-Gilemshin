import styles from './chat-list.module.css';
import imgUrl from '../../../../assets/avatar.png';
import {Done, DoneAll} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {AppRoutes} from "../../../../utils/types/AppRoutes.js";

export function ChatList() {
    const chatList = [
        {
            id: "1",
            avatar: '/public/avatar.png',
            name: 'Дженнифер',
            preview: 'Есть над чем задуматься: непосредственные участники технического прогресса рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок.',
            time: '13:25',
            status: 'done_all'
        },
        {
            id: "2",
            avatar: 'avatar.png',
            name: 'Дженнифер',
            preview: 'Есть над чем задуматься',
            time: '13:25',
            status: 'done'
        },
    ];

    return (
        <ul>
            {chatList.map((chat, index) => (
                <Link key={index} to={`${AppRoutes.Chat}${chat.id}`}>
                    <li  className={styles.personal_chat}>
                        <Avatar pulse={index === 0} />
                        <Name name={chat.name} />
                        <Preview preview={chat.preview} />
                        <Time time={chat.time} />
                        <Status status={chat.status} />
                    </li>
                </Link>
            ))}
        </ul>
    );
}

function Avatar({ pulse }) {
    return <img className={`${styles.personal_chat__avatar} ${pulse ? styles.pulse : ''}`} src={imgUrl} alt="avatar" />;
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

function Status({ status }) {
    return getElementByStatus(status, styles.personal_chat__status);
}

function getElementByStatus(status, className) {
    switch (status) {
        case 'done':
            return <Done width={36} className={className}/>
        case 'done_all':
            return <DoneAll width={36} className={className}/>

    }
}