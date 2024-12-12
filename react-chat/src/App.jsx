import './App.css'
import {ChatListPage} from "./pages/СhatListPage/ChatListPage.jsx";
import {HashRouter, Route, Routes} from "react-router-dom";
import {PersonalChat} from "./pages/PersonalChat/PersonalChat.jsx";
import {EditProfile} from "./pages/EditProfile/EditProfile.jsx";

export function App() {

    return (
        <HashRouter>
            <Routes>
                <Route path={"/"} element={<ChatListPage />} />
                <Route path={"/chat/:id"} element={<PersonalChat />}/>
                <Route path={"/profile/edit"} element={<EditProfile />}/>
            </Routes>
        </HashRouter>
    )
}
