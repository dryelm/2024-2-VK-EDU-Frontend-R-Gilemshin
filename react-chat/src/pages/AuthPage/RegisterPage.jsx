import {useState} from "react";
import styles from "./styles.module.css"
import {TextInput} from "../../components/TextInput/TextInput.jsx";
import {LargeTextInput} from "../../components/LargeTextInput/LargeTextInput.jsx";
import {AppRoutes} from "../../utils/types/AppRoutes.js";
import {Link, useNavigate} from "react-router-dom";
import {AuthApi} from "../../api/callbacks/AuthApi.js";
import {toast} from "react-toastify";

export function RegistrationPage() {
    const goTo = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        bio: '',
        avatar: null
    });

    const setUserName = (value) => setFormData({ ...formData, username: value });
    const setPassword = (value) => setFormData({ ...formData, password: value });
    const setFirstName = (value) => setFormData({ ...formData, first_name: value });
    const setLastName = (value) => setFormData({ ...formData, last_name: value });
    const setBio = (value) => setFormData({ ...formData, bio: value });
    const setAvatar = (file) => setFormData({ ...formData, avatar: file });

    const handleFileChange = (e) => {
        const { files } = e.target;
        setAvatar(files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await AuthApi.register(formData);
        toast("Регистрация успешна");
        goTo(AppRoutes.Login);
    };

    return (
        <div className={styles.page}>
            <form className={styles.fields} onSubmit={handleSubmit}>
                <h1>Регистрация</h1>
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
                            type="password"
                            className={styles.field__input}
                            value={formData.password}
                            onInput={setPassword}
                            required
                        />
                    </label>
                </div>
                <div className={styles.field}>
                    <label>First Name
                        <TextInput
                            type="text"
                            className={styles.field__input}
                            value={formData.first_name}
                            onInput={setFirstName}
                            required
                        />
                    </label>
                </div>
                <div className={styles.field}>
                    <label>Last Name
                        <TextInput
                            type="text"
                            className={styles.field__input}
                            value={formData.last_name}
                            onInput={setLastName}
                            required
                        />
                    </label>
                </div>
                <div className={styles.field}>
                    <label>Bio
                        <LargeTextInput
                            className={styles.field__large_input}
                            value={formData.bio}
                            onInput={(e) => setBio(e)}
                        />
                    </label>
                </div>
                <div className={styles.field}>
                    <label>Avatar
                        <input
                            type="file"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
                <div className={styles.controls}>
                    <button type="submit" className={styles.submitButton}>Зарегистрироваться</button>
                    <Link to={AppRoutes.Login} className={styles.changePage}>Войти</Link>
                </div>
            </form>
        </div>
    );
}