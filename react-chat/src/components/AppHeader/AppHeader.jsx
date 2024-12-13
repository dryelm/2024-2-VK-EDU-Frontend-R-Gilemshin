import styles from './app-header.module.css';

export function AppHeader({leftButtons, pageDescription, rightButtons}) {
    return (
        <header className={styles.header}>
            {leftButtons}
            {pageDescription}
            {rightButtons}
        </header>
    );
}

