export function createHeader(){
    const header = document.createElement('header');
    header.classList.add('header');
    header.innerHTML = `
    <span class="material-symbols-outlined">menu</span>
    <article>
        <h5>Messenger</h5>
    </article>
    <span class="material-symbols-outlined">search</span>`;

    document.body.appendChild(header);
}
