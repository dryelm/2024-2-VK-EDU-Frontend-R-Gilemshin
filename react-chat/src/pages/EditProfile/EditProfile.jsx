import {AppHeader} from "../../components/AppHeader/AppHeader.jsx";
import {ArrowBack, CameraAlt, Check} from "@mui/icons-material";
import imgUrl from "/src/assets/5713_1.jpg"
import styles from "./styles.module.css"
import {TextInput} from "../../components/TextInput/TextInput.jsx";
import {useState} from "react";
import {LargeTextInput} from "../../components/LargeTextInput/LargeTextInput.jsx";

function Field({label, placeHolder, value, setValue}) {
    return (
    <div className={styles.input_block}>
        <label>
            {label}
            <TextInput value={value}
                       onInput={setValue}
                       className={styles.input_block__input}
                       placeholder={placeHolder}/>
        </label>

    </div>
    );
}

function LargeField({label, placeHolder, value, setValue}) {
    return (
        <div className={styles.input_block}>
            <label>
                {label}
                <LargeTextInput
                    value={value}
                    onInput={setValue}
                    className={styles.input_block__large_input}
                    placeholder={placeHolder}
                />
            </label>
        </div>
    );
}

export function EditProfile(){
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    return(
        <div>
            <AppHeader
                leftButtons={ <ArrowBack/> }
                pageDescription={ <article><h5>Edit Profile</h5></article> }
                rightButtons={ <Check/> }
            />

            <div>
                <img src={ imgUrl } className={ styles.profile_picture__img } alt={ "Edit profile picture" }/>
                <div className={ styles.camera_icon }>
                    <CameraAlt/>
                </div>
            </div>
            <div className={ styles.input_blocks }>
                <Field
                    label="Full name"
                    placeHolder="Enter Name"
                    value={ fullName }
                    setValue={ setFullName }
                />

                <Field
                    label={ "Username" }
                    placeHolder={ "Enter username" }
                    value={ username }
                    setValue={ setUsername }
                />
                <span className={ styles.remark }>Minimum length is 5 characters</span>

                <LargeField
                    placeHolder={ "Enter bio" }
                    setValue={ setBio }
                    value={ bio }
                    label="Bio"
                />
                <span className={ styles.remark }>Any details about you</span>

            </div>

        </div>
    )
}

