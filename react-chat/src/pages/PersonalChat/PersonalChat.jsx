import {useEffect, useRef, useState} from 'react';
import {ArrowBack, Attachment, MoreVert, Search} from "@mui/icons-material";
import styles from "./styles.module.css"
import {LargeTextInput} from "../../components/LargeTextInput/LargeTextInput.jsx";
import {Link, useParams} from "react-router-dom";
import {AppHeader} from "../../components/AppHeader/AppHeader.jsx";
import {AppRoutes} from "../../utils/types/AppRoutes.js";
import {ChatUpdateManager} from "../../api/ChatUpdateManager.js";
import {MessagesApi} from "../../api/callbacks/MessagesApi.js";
import {ChatsApi} from "../../api/callbacks/ChatsApi.js";
import {CurrentUserKey} from "../../api/utils/ApiHelper.js";


export function PersonalChat() {
    const {chatId} = useParams()
    const manager = useRef(null);
    const currentUser = JSON.parse(localStorage.getItem(CurrentUserKey));
    const [messages, setMessages] = useState([]);
    const [chatInfo, setChatInfo] = useState({avatar: "", title: ""});
    const [messageText, setMessageText] = useState('');


    const handleAddMessage = async (text) => {
        const data = {text: text, chat: chatId};
        await MessagesApi.sendMessage(data);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (messageText.trim()) {
            void handleAddMessage(messageText.trim());
            setMessageText('');
        }
    };

    const loadMessages = async (chatId) => {
        let pageNumber = 1;
        let pageSize = 30;
        let messages = [];
        let response = { 'next': '' };
        while (response['next'] !== null) {
            response = await MessagesApi.getChatMessages(chatId, pageNumber++, pageSize)
            messages = messages.concat(response['results'].reverse());
        }
        setMessages(messages);
    };

    async function loadChatInfo(chatId) {
        const data = await ChatsApi.getChat(chatId);
        setChatInfo({avatar: data.avatar, title: data.title});
    }

    useEffect(() => {
        void loadChatInfo(chatId);
        void loadMessages(chatId);

        manager.current = ChatUpdateManager(chatId, setMessages)

        return manager.current.unsubscribe;
    }, [chatId]);

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
                        {chatInfo.avatar && <img id="avatar" src={ chatInfo.avatar } alt="Avatar" className={ styles.avatar }/>}
                            <article>
                                <h5>{chatInfo.title}</h5>
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
                {messages.map((message, index) => ( message.sender.id === currentUser.id
                    ? <MyMessage key={index} message={message}/>
                    : <OthersMessage key={index} message={message} /> ))}
            </div>

            <div ref={messageContainerRef} className={styles.new_message}>
                <LargeTextInput
                    required={true}
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
    const date = new Date(message.updated_at).toLocaleString();

    return (
        <div
            className={styles.message}
        >
            <p className={styles.message__name}>
                Я
            </p>
            <p>
                {message.text}
            </p>
            <p className={styles.message__time}>
                {date}
            </p>
        </div>);
}

function OthersMessage({message}){
    const date = new Date(message.updated_at).toLocaleString();
    return (
        <div
            className={styles.others_message}
        >
            <p className={styles.message__name}>
                {`${message.sender.first_name} ${message.sender.last_name} (@${message.sender.username})`}
            </p>
            <p>
                {message.text}
            </p>
            <p className={styles.message__time}>
                {date}
            </p>
        </div>);
}


