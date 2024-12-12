import {ChatList} from "./components/chat-list/ChatList.jsx";
import {AppHeader} from "../../components/AppHeader/AppHeader.jsx";
import {NewChatButton} from "./components/new-chat-button/NewChatButton.jsx";
import {Menu, Search} from "@mui/icons-material";


export function ChatListPage() {
  return (
    <div className="chat-list-page">
        <AppHeader
            leftButtons={
            <Menu width={36} />
        }
            pageDescription={
                       <article>
                           <h5>Messenger</h5>
                       </article>
                    }
            rightButtons={<Search/>}
            />
        <ChatList/>
        <NewChatButton/>
    </div>
  );
}