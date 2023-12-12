import "../style.css";

(document.getElementById('launch-game-btn') as HTMLButtonElement).addEventListener('click',()=>{
    const value = (document.getElementById('nb-words-input') as HTMLInputElement).value
    window.location.href = `/jeu-oc-latin-espagnol/game/?nb_words=${value}`
})