import {ChatList} from "./components/chat-list/ChatList.jsx";
import {AppHeader} from "../../components/AppHeader/AppHeader.jsx";
import {NewChatButton} from "./components/new-chat-button/NewChatButton.jsx";
import {Menu, Search} from "@mui/icons-material";
import {useEffect, useRef, useState} from "react";
import {ChatsApi} from "../../api/callbacks/ChatsApi.js";
import {ChatUpdateManager} from "../../api/ChatUpdateManager.js";
import {CreateChatModal} from "./components/CreateChatModal/CreateChatModal.jsx";


export function ChatListPage() {
    const [chats, setChats] = useState([]);
    const [isCreateChatOpen, setIsCreateChatOpen] = useState(false);
    const manager = useRef(null);

    useEffect(() => {
        void loadChats();
        manager.current = ChatUpdateManager(null, null, null, setChats);
        return manager.current.unsubscribe;
    }, []);

    const toState = (x) => {
        return {
            id: x.id,
            avatar: x.avatar,
            time: new Date(x.updated_at).toLocaleString(),
            name: x.title,
            preview: x.last_message.text,
            unread_messages: x.unread_messages
        };
    };

    async function loadChats() {
        let pageNumber = 1;
        let pageSize = 30;
        let chats = [];
        let response = { 'next': '' };
        while (response['next'] !== null) {
            response = await ChatsApi.getChats(pageNumber++, pageSize);
            console.log(response);
            chats = chats.concat(response['results'].reverse().map(x => toState(x)));
        }
        setChats(chats);
    }

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