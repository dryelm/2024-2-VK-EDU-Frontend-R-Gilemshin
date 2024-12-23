import {ChatList} from "./components/chat-list/ChatList.jsx";
import {AppHeader} from "../../components/AppHeader/AppHeader.jsx";
import {NewChatButton} from "./components/new-chat-button/NewChatButton.jsx";
import {Menu, Search} from "@mui/icons-material";
import {useCallback, useEffect, useRef, useState} from "react";
import {ChatsApi} from "../../api/callbacks/ChatsApi.js";
import {CreateChatModal} from "./components/CreateChatModal/CreateChatModal.jsx";
import {ChatUpdateManager} from "../../api/ChatUpdateManager.js";
import {useCurrentUserStore} from "../../utils/store/currentUserStore.js";


export function ChatListPage() {
    const [chats, setChats] = useState([]);
    const [isCreateChatOpen, setIsCreateChatOpen] = useState(false);
    const manager = useRef(null);
    const {currentUser} =  useCurrentUserStore()

    const getPreview = (last_message) => {
        if (!last_message){
            return "Ещё нет сообщений"
        }
        if (last_message.voice){
            return "Голосовое сообщение"
        }

        if (!last_message.text){
            return last_message.files.join(", ")
        }

        return last_message.text;
    }

    const toState = useCallback((x) => {
        return {
            id: x.id,
            avatar: x.avatar,
            time: new Date(x.updated_at).toLocaleString(),
            name: x.title,
            preview: getPreview(x.last_message),
            unread_messages: x.unread_messages
        };
    }, []);


    const onMessage = async (message) => {
        const newChat = await ChatsApi.getChat(message.chat);
        setChats((prevChats) => {
            if (!prevChats.some((chat) => chat.id === message.chat)) {
                if (newChat.members.some((user) => user.id === currentUser['id'])) {
                    return [newChat, ...prevChats];
                }
            }

            else {
                const chatToUpdate = prevChats.find((chat) => chat.id === message.chat);
                const oldChats = prevChats.filter((chat) => chat.id !== message.chat);

                return [{...chatToUpdate, last_message: message}, ...oldChats];
            }
        });
    }

    const loadChats = useCallback(async () => {
        let pageNumber = 1;
        let pageSize = 30;
        let chats = [];
        let response = { 'next': '' };
        while (response['next'] !== null) {
            response = await ChatsApi.getChats(pageNumber++, pageSize);
            chats = chats.concat(response['results'].reverse().map(x => toState(x)));
        }
        setChats(chats);
    }, [toState]);

    useEffect(() => {
        void loadChats();
        manager.current = ChatUpdateManager(onMessage, currentUser);
        return manager.current.unsubscribe;
    }, [currentUser, loadChats]);

    return (
        <div className="chat-list-page">
            <AppHeader
                leftButtons={
                    <Menu width={ 36 }/>
                }
                pageDescription={
                    <article>
                        <h5>Messenger</h5>
                    </article>
                }
                rightButtons={ <Search/> }
            />
            <ChatList chatList={chats}/>
            <NewChatButton openModal={() => {setIsCreateChatOpen(true)}}/>
            {isCreateChatOpen && <CreateChatModal onClose={() => setIsCreateChatOpen(false)}/>}
        </div>
    );
}