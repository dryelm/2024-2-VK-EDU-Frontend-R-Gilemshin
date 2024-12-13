import {useEffect, useRef, useState} from 'react';

import imgUrl from "../../../../react-chat/src/assets/avatar.png";
import {ArrowBack, Attachment, MoreVert, Search} from "@mui/icons-material";
import styles from "./styles.module.css"
import {LargeTextInput} from "../../components/LargeTextInput/LargeTextInput.jsx";
import {Link} from "react-router-dom";
import {AppHeader} from "../../components/AppHeader/AppHeader.jsx";
import {AppRoutes} from "../../utils/types/AppRoutes.js";

const senderName = 'Челик';
const me = "Я";

export function PersonalChat() {
    const othersMessage = { messages: [
            {
                text: "Есть над чем задуматься: непосредственные участники технического прогресса рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок.",
                sender: senderName,
                time: "04:20"
            }
        ] }

    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem('messages');

        return savedMessages ? [...othersMessage.messages ,...JSON.parse(savedMessages)] : [];
    });

    const [messageText, setMessageText] = useState('');


    const handleAddMessage = (text, sender, time) => {
        const newMessage = { text, sender, time };
        setMessages(prev => [...prev, newMessage]);
        localStorage.setItem('messages', JSON.stringify([...messages, newMessage]));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (messageText.trim()) {
            const currentTime = new Date().toLocaleTimeString();
            handleAddMessage(messageText, me, currentTime);
            setMessageText('');
        }
    };

    useEffect(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    const messageContainerRef = useRef(null);

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <AppHeader
                leftButtons={
                        <Link to={AppRoutes.HomePage}>
                            <ArrowBack/>
                        </Link>
                }
                pageDescription={
                        <>
                            <img id="avatar" src={ imgUrl } alt="Avatar" className={ styles.avatar }/>
                            <article>
                                <h5>челик</h5>
                                <h6>был 2 часа назад</h6>
                            </article>
                        </>
                }
                rightButtons={
                        <>
                            <Search/>
                            <MoreVert/>
                        </>
                }
            />


            <div className={styles.messages}>
                {messages.map((message, index) => ( message.sender === me
                    ? <MyMessage key={index} message={message}/>
                    : <OthersMessage key={index} message={message} /> ))}
            </div>

            <div ref={messageContainerRef} className={styles.new_message}>
                <LargeTextInput
                    value={messageText}
                    className={styles.new_message__input}
                    placeholder={"Сообщение"}
                    onInput={setMessageText}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                        }
                    }}
                />
                <Attachment/>
            </div>
        </form>
    );
}

function MyMessage({message}) {
    return (
        <div
            className={styles.message}
        >
            <p className={styles.message__name}>
                {message.sender}
            </p>
            <p>
                {message.text}
            </p>
            <p className={styles.message__time}>
                {message.time}
            </p>
        </div>);
}

function OthersMessage({message}){
    return (
        <div
            className={styles.others_message}
        >
            <p className={styles.message__name}>
                {message.sender}
            </p>
            <p>
                {message.text}
            </p>
            <p className={styles.message__time}>
                {message.time}
            </p>
        </div>);
}


