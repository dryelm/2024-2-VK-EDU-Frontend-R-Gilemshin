import {useCallback, useEffect, useState} from "react";
import styles from "./styles.module.css";
import {TextInput} from "../../../../components/TextInput/TextInput.jsx";
import {UserApi} from "../../../../api/callbacks/UserApi.js";
import {ChatsApi} from "../../../../api/callbacks/ChatsApi.js";
import {CurrentUserKey} from "../../../../api/utils/ApiHelper.js";
import {ModalWindow} from "../../../../components/ModalWindow/ModalWindow.jsx";

export function CreateChatModal({ onClose }) {
    const [formData, setFormData] = useState({
        members: [],
        is_private:  false,
        title:  '',
        avatar: null,
    });

    const [options, setOptions] = useState([]);
    const [search, setSearch] = useState("");

    const setTitle = (value) => setFormData({ ...formData, title: value });
    const setPrivate = (value) => setFormData({ ...formData, is_private: value });
    const setAvatar = (file) => setFormData({ ...formData, avatar: file });
    const setMembers = (members => setFormData({...formData, members: members}));

    const handleFileChange = (e) => {
        const { files } = e.target;
        setAvatar(files[0]);
    };

    const handleSelectChange = (e) => {
        const selected = Array.from(e.target.selectedOptions, (option) => option.value);
        setMembers(selected);
    }

    const handleSave = async () => {
        const creator = localStorage.getItem(CurrentUserKey);
        let data = formData;
        data ={...data, creator: creator};
        await ChatsApi.createChat(data);
        onClose();
    };

    const loadPossibleUsers = useCallback(async () => {
        const response = await UserApi.getUsers(1, 100, search);
        const possibleUsers = response.results.map(user => ({
            value: user.id,
            label: `${user.first_name} ${user.last_name} (@${user.username})`
        }));
        setOptions(possibleUsers);
    }, [search]);

    useEffect(() => {
        void loadPossibleUsers();
    }, [search, loadPossibleUsers]);

    return (
        <ModalWindow onClose={onClose} onSave={handleSave} header="Создать группу">
            <div className={styles.inputContainer}>
                <label>
                    Название группы
                    <TextInput
                        type="text"
                        required={true}
                        value={formData.title}
                        onInput={setTitle}
                    />
                </label>
            </div>
            <div className={styles.inputContainer}>
                <label>
                    Приватная группа
                    <input
                        className={styles.checkbox}
                        type="checkbox"
                        checked={ formData.is_private }
                        onChange={ (e) => setPrivate(e.target.checked) }
                    />
                </label>
            </div>

            <div className={styles.inputContainer}>
                <TextInput
                    type='search'
                    value={search}
                    onInput={setSearch}
                    placeholder="Имя или юзернейм"
                >

                </TextInput>
                {options.length !== 0 && <select
                    className={styles.userSelect}
                    required
                    multiple
                    onChange={handleSelectChange}
                >
                    {options.map((option) => (
                        <option key={ option.value } value={ option.value }>
                            { option.label }
                        </option>))
                    }
                </select>}
                {options.length === 0 && <p className={styles.userSelect}>Не нашли пользователей</p>}
            </div>

            <div className={ styles.inputContainer }>
            <label>Аватар группы
                    <input
                        type="file"
                        onChange={ handleFileChange }
                    />
                </label>
            </div>

        </ModalWindow>
    );
}