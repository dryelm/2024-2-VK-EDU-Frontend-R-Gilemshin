import './App.css'
import {ChatListPage} from "./pages/СhatListPage/ChatListPage.jsx";
import {HashRouter, Route, Routes} from "react-router-dom";
import {PersonalChat} from "./pages/PersonalChat/PersonalChat.jsx";
import {EditProfile} from "./pages/EditProfile/EditProfile.jsx";
import {AuthPage} from "./pages/AuthPage/AuthPage.jsx";
import {AppRoutes} from "./utils/types/AppRoutes.js";
import {RegistrationPage} from "./pages/AuthPage/RegisterPage.jsx";
import {Bounce, ToastContainer} from "react-toastify";
import {PrivateRoute} from "./components/PrivateRoute/PrivateRoute.jsx";

export function App() {

    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path={"*"} element={<>Error</>}/>
                    <Route path={AppRoutes.HomePage} element={<PrivateRoute><ChatListPage /></PrivateRoute>} />
                    <Route path={`${AppRoutes.Chat}/:chatId`} element={<PrivateRoute><PersonalChat /></PrivateRoute>}/>
                    <Route path={AppRoutes.EditProfile} element={<PrivateRoute><EditProfile /></PrivateRoute>}/>
                    <Route path={AppRoutes.Login} element={<AuthPage />}/>
                    <Route path={AppRoutes.Register} element={<RegistrationPage />}/>
                </Routes>
            </HashRouter>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </>
    )
}
