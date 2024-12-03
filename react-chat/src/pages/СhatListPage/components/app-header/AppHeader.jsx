import React from 'react';
import styles from './app-header.module.css';
import {Menu, Search} from "@mui/icons-material";

export function AppHeader() {
    return (
        <header className={styles.header}>
            <Menu width={36} />
            <Title />
            <Search />
        </header>
    );
}

function Title() {
    return (
        <article>
            <h5>Messenger</h5>
        </article>
    );
}

