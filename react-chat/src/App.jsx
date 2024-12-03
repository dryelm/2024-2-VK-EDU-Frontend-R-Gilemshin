import './App.css'
import {ChatListPage} from "./pages/СhatListPage/ChatListPage.jsx";
import {useState} from "react";
import {Page} from "./utils/types/Page.js";
import {PersonalChat} from "./pages/PersonalChat/PersonalChat.jsx";

function App() {
    const [page, setPage] = useState(0)
    switch (page) {
        case (Page["ChatListPage"]):
            return <ChatListPage changeState={setPage}/>
        case (Page["PersonalChat"]):
            return <PersonalChat changePage={setPage} />
    }
}

export default App
