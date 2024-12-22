import {TextInput} from "../../components/TextInput/TextInput.jsx";
import styles from "./styles.module.css"
import {useState} from "react";
import {AuthApi} from "../../api/callbacks/AuthApi.js";
import {Link, useNavigate} from "react-router-dom";
import {AppRoutes} from "../../utils/types/AppRoutes.js";
import {UserApi} from "../../api/callbacks/UserApi.js";
import {useCurrentUserStore} from "../../utils/store/currentUserStore.js";
import {useAuthStore} from "../../utils/store/tokensStore.js";

export function AuthPage(){
    const goTo = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const setUserName = (value) => setFormData({...formData, username: value});
    const setPassword = (value) => setFormData({...formData, password: value});
    const {setCurrentUser} = useCurrentUserStore()
    const {setTokens} = useAuthStore()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await AuthApi.auth(formData);
        setTokens(data);
        setCurrentUser(await UserApi.getUser("current"))
        goTo(AppRoutes.HomePage);
    };

    return (
        <div className={styles.page}>
            <form className={styles.fields} onSubmit={handleSubmit}>
                <h1>Зайти в чаты</h1>
                <div className={styles.field}>
                    <label>Username
                        <TextInput
                            type="text"
                            className={styles.field__input}
                            value={formData.username}
                            onInput={setUserName}
                            required
                    />
                    </label>

                </div>
                <div className={styles.field}>
                    <label>Password
                        <TextInput
                            className={styles.field__input}
                            type="password"
                            value={formData.password}
                            onInput={setPassword}
                            required
                    />
                    </label>

                </div>
                <div className={styles.controls}>
                    <button type="submit" className={ styles.submitButton }>Войти</button>
                    <Link to={AppRoutes.Register} className={styles.changePage}>Регистрация</Link>
                </div>

            </form>
        </div>
    );
}