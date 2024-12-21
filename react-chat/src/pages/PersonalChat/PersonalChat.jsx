import {useCallback, useEffect, useRef, useState} from 'react';
import {ArrowBack, Delete, LocationOn, Mic, MoreVert, Search, SendSharp} from "@mui/icons-material";
import styles from "./styles.module.css"
import {LargeTextInput} from "../../components/LargeTextInput/LargeTextInput.jsx";
import {Link, useParams} from "react-router-dom";
import {AppHeader} from "../../components/AppHeader/AppHeader.jsx";
import {AppRoutes} from "../../utils/types/AppRoutes.js";
import {MessagesApi} from "../../api/callbacks/MessagesApi.js";
import {ChatsApi} from "../../api/callbacks/ChatsApi.js";
import {CurrentUserKey} from "../../api/utils/ApiHelper.js";
import {toast} from "react-toastify";
import {AudioPlayer} from "../../components/AudioPlayer/AudioPlayer.jsx";
import {useVoiceRecorder} from "../../components/hooks/useVoiceRecorder/useVoiceRecorder.js";
import {ChatUpdateManager} from "../../api/ChatUpdateManager.js";
import {sendNotification} from "../../utils/notifier/sendNotification.js";

export function PersonalChat() {
    const {chatId} = useParams()
    const manager = useRef(null);
    const currentUser = JSON.parse(localStorage.getItem(CurrentUserKey));
    const [messages, setMessages] = useState([]);
    const [chatInfo, setChatInfo] = useState({avatar: "", title: ""});
    const [messageText, setMessageText] = useState('');
    const [dragging, setDragging] = useState(false);
    const [attachedFiles, setAttachedFiles] = useState([]);
    const [startRecording, stopRecording, cancelRecording, isRecording, voice] = useVoiceRecorder();

    const cleanForm = () => {
        setMessageText('');
        setAttachedFiles([]);
        if (voice) cancelRecording();
    }

    const onRecording = async () => {
        await startRecording();
    }

    const handleAddMessage = async (data) => {
        await MessagesApi.sendMessage(data);
        cleanForm();
    };

    const handleSubmit = () => {
        if (messageText.trim() || attachedFiles.length || voice !== null) {
            let data = new FormData();
            data.append("chat", chatId);

            if (voice) {
                data.append("voice", voice, "voice.ogg");
                void handleAddMessage(data);
                return;
            }

            if (messageText.trim()) {
                data.append("text", messageText.trim());
            }

            if (attachedFiles.length) {
                attachedFiles.forEach(x => data.append("files", x));
            }

            void handleAddMessage(data);
        }
    };

    const handleFileSelection = (file) => {
        setAttachedFiles((prev) => [...prev, file]);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        const files = Array.from(event.dataTransfer.files);
        if (files && files.length) {
            files.forEach(handleFileSelection);
        }
    };

    const handleGeoLocation = () => {
        getUserLocation().then((location) => {
            setMessageText(location);
        });
    };

    const onMessage = useCallback((message) => {
        if (message.chat !== chatId) {
            sendNotification(message);
            return;
        }

        setMessages((prevMessages) => {
            if (prevMessages.some((msg) => msg.id === message.id)) {
                console.log("Message already exists:", message);
                return prevMessages;
            }
            console.log("Adding new message:", message);
            return [ message, ...prevMessages];
        });
    }, [chatId]);

    const loadChatInfo = async chatId => {
        const data = await ChatsApi.getChat(chatId);
        setChatInfo({avatar: data.avatar, title: data.title});
    };

    const loadMessages = async (chatId) => {
        let pageNumber = 1;
        let pageSize = 30;
        let messages = [];
        let response = {'next': ''};
        while (response['next'] !== null) {
            response = await MessagesApi.getChatMessages(chatId, pageNumber++, pageSize);
            messages = messages.concat(response['results']);
        }
        setMessages(messages);
    };

    useEffect(() => {
        console.log(messages.length);
    }, [messages]);

    useEffect(() => {
        loadChatInfo(chatId);
        loadMessages(chatId);
        manager.current = ChatUpdateManager(onMessage);
        return manager.current.unsubscribe;
        }, [chatId, onMessage]
    );

    useEffect(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    return (
        <div
            className={ styles.page }
        >
            <AppHeader
                leftButtons={
                    <Link to={ AppRoutes.HomePage }>
                        <ArrowBack/>
                    </Link>
                }
                pageDescription={
                    <>
                        { chatInfo.avatar &&
                            <img id="avatar" src={ chatInfo.avatar } alt="Avatar" className={ styles.avatar }/> }
                        <article>
                            <h5>{ chatInfo.title }</h5>
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
            <div className={ styles.messages }>
                { messages.map((message, index) => (<Message key={ index } message={ message }
                                                      isCurrentUser={ message.sender.id === currentUser.id }/>)) }
            </div>

            <form className={ styles.new_message }
                  onDragOver={ handleDragOver }
                  onDragLeave={ handleDragLeave }
                  onDrop={ handleDrop }
                  onKeyDown={ (e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmit();
                      }
                  } }
            >
                <div className={ styles.mainControl }>
                    { dragging && <div>Отпустите файл для загрузки</div> }
                    { (!isRecording && !voice && !dragging) &&
                        <LargeTextInput
                            required
                            value={ messageText }
                            className={ styles.new_message__input }
                            placeholder="Сообщение"
                            onInput={ setMessageText }

                        /> }
                    { isRecording && <span>Записываем голосовое сообщение...</span> }
                    { !isRecording && voice && <span>Голосовое сообщение записано</span> }
                    { attachedFiles && attachedFiles.map((x, index) => <span key={ index }>{ x.name + " " }</span>) }
                </div>


                <LocationOn onClick={ handleGeoLocation }></LocationOn>

                { isRecording ? (
                    <Mic onClick={ stopRecording } className={ styles.activeMic }></Mic>
                ) : (
                    <Mic onClick={ onRecording }></Mic>
                ) }
                <Delete
                    onClick={ cleanForm }
                >
                </Delete>
                <SendSharp onClick={ handleSubmit }/>

            </form>
        </div>
    );
}

function Message({message, isCurrentUser}) {
    const date = new Date(message.updated_at).toLocaleString();

    return (
        <div className={ isCurrentUser ? styles.message : styles.others_message }>
            <p className={ styles.message__name }>
                { isCurrentUser ? "Я" : `${ message.sender.first_name } ${ message.sender.last_name } (@${ message.sender.username })` }
            </p>
            <p>{ message.text }</p>
            { message.files && message.files.length > 0 && (
                message.files.map((file, index) => (
                    <div key={ index }>
                        <img className={ styles.image } src={ file.item } alt={ file.item.split("/").pop() }/>
                    </div>
                ))
            )
            }
            { message.voice && <AudioPlayer src={ message.voice }/> }

            <p className={ styles.message__time }>
                { date }
            </p>
        </div>
    );
}

function getUserLocation() {
    if (!navigator.geolocation) {
        toast.error('Geolocation API не поддерживается вашим браузером.');
        return Promise.reject('Geolocation API не поддерживается вашим браузером.');
    }

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const {latitude, longitude} = position.coords;
                const pos = `https://www.openstreetmap.org/#map=18/${ latitude }/${ longitude }`;
                resolve(pos);
            },
            (error) => {
                toast.error('Не удалось получить координаты: ' + error.message);
                reject(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 100000
            }
        );
    });
}
