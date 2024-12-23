import styles from "./styles.module.css";
import {Button} from "../Button/Button.jsx";

export function ModalWindow({header, children, onClose, onSave}) {
    return (
        <div className={ styles.modalBackdrop }>
            <form className={ styles.modalContent }>
                <h2>{ header }</h2>
                { children }
                <div className={ styles.controls }>
                    <Button onClick={ onSave }>
                        Сохранить
                    </Button>
                    <Button className={ styles.cancelButton } onClick={ onClose }>
                        Отмена
                    </Button>
                </div>
            </form>
        </div>)
}