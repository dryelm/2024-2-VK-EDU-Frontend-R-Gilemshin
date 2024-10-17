import styles from './app-header.module.css';


export function createHeader() {
    const header = document.createElement('header');
    header.classList.add(styles.header); 

    header.appendChild(createMenuIcon());
    header.appendChild(createTitle());
    header.appendChild(createSearchIcon());

    document.body.appendChild(header);
}

function createMenuIcon() {
    const menuIcon = document.createElement('span');
    menuIcon.classList.add('material-symbols-outlined');
    menuIcon.textContent = 'menu';
    return menuIcon;
}

function createTitle() {
    const article = document.createElement('article');
    const title = document.createElement('h5');
    title.textContent = 'Messenger';
    
    article.appendChild(title);
    return article;
}


function createSearchIcon() {
    const searchIcon = document.createElement('span');
    searchIcon.classList.add('material-symbols-outlined');
    searchIcon.textContent = 'search';
    return searchIcon;
}