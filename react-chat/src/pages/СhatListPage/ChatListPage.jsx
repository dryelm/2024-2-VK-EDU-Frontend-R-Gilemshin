import {ChatList} from "./components/chat-list/ChatList.jsx";
import {AppHeader} from "./components/app-header/AppHeader.jsx";
import {NewChatButton} from "./components/new-chat-button/NewChatButton.jsx";

export function ChatListPage({changeState}) {
  return (
    <div className="chat-list-page">
        <AppHeader />
        <ChatList changePage={changeState}/>
        <NewChatButton />
    </div>
  );
}