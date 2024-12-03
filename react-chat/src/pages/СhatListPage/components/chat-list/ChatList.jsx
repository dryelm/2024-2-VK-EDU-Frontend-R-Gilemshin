import React from 'react';
import styles from './chat-list.module.css';
import imgUrl from '../../../../assets/avatar.png';
import {Done, DoneAll} from "@mui/icons-material";
import {Page} from "../../../../utils/types/Page.js";

export function ChatList({changePage}) {
    const chatList = [
        {
            avatar: '/public/avatar.png',
            name: 'Дженнифер',
            preview: 'Есть над чем задуматься: непосредственные участники технического прогресса рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок.',
            time: '13:25',
            status: 'done_all'
        },
        {
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
                <li key={index} onClick={() => changePage(Page["PersonalChat"])} className={styles.personal_chat}>
                    <Avatar pulse={index === 0} />
                    <Name name={chat.name} />
                    <Preview preview={chat.preview} />
                    <Time time={chat.time} />
                    <Status status={chat.status} />
                </li>
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