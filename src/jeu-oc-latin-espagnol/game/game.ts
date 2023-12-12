import "./style.css";
import "../../style.css";
import { card_preparation, francais_translation, img_list } from "../libs/words";
import { wait } from "../libs/libs";

let nb_clicked = card_preparation.filter(
    (card_data) => card_data.clicked
).length;
const update_nb_clicked = () => {
    nb_clicked = card_preparation.filter(
        (card_data) => card_data.clicked
    ).length;
};
let canInteract = true
const body_element = document.getElementsByTagName('body')[0] as HTMLBodyElement
const dialog_box = document.getElementById("response-box") as HTMLDialogElement
const compare_words_event = new Event("compare_words");
window.addEventListener("compare_words", async () => {
    canInteract = false
    console.log('3 words clicked')
    const clicked_cards = card_preparation.filter((card_data) => card_data.clicked)
    console.log(clicked_cards)
    await wait(500)
    console.log('done waiting')
    clicked_cards.forEach(card => {
        card_preparation[card.id].clicked = false
        card_preparation[card.id].element?.getElementsByTagName('p')[0].classList.add("hidden")
        card_preparation[card.id].element?.style.setProperty("--propag", "25%");
    })
    // Verify if they are the same words
    if (clicked_cards[0].idword == clicked_cards[1].idword && clicked_cards[1].idword == clicked_cards[2].idword) {
        clicked_cards.forEach(card => {
            card_preparation[card.id].solved = true
            card_preparation[card.id].element?.getElementsByTagName('p')[0].classList.remove('hidden')
            card_preparation[card.id].element?.style.setProperty("--propag", "40%")
            card_preparation[card.id].element?.style.setProperty("--valid-propag", "80%")
        })
        // Setting up the dialog box
        dialog_box.innerHTML = `<div class="dialog-img-container"><img id="dialog-img" alt="Une image de ${francais_translation[clicked_cards[0].idword]}"></div><div class="dialog-bottom-part"><p>Cela veut dire: ${francais_translation[clicked_cards[0].idword]}</p><button id="dialog-close">Fermer</button></div>`;

        // Defining image and button
        (document.getElementById('dialog-img') as HTMLImageElement).src = img_list[clicked_cards[0].idword];
        (document.getElementById('dialog-close') as HTMLButtonElement).addEventListener('click', () => {
            dialog_box.close();
            body_element.classList.remove('blur')
        })

        // Show the dialog box
        dialog_box.show()
    }

    canInteract = true
});
const cardzone = document.getElementById("card-zone") as HTMLElement;
card_preparation.forEach((card_data) => {
    // Create elements
    const card = document.createElement("div");
    const card_content = document.createElement("p");

    // Set text
    card_content.innerText = card_data.word;

    // Set properties
    card_content.classList.add("card-content", "hidden");
    card.classList.add("card");
    card.style.setProperty("--propag", "25%");
    card_data.element = card
    switch (card_data.lang) {
        case "occitan":
            card.style.setProperty("--color-pri", "#ffd900");
            break;
        case "latin":
            card.style.setProperty("--color-pri", "#004fc5");
            break;
        case "espagnol":
            card.style.setProperty("--color-pri", "#c60b1e");
            break;
        case "fr":
            card.style.setProperty("--color-pri", "#c60b1e");
            break;
        default:
            break
    }

    // Add Click interaction
    card.addEventListener("click", (_ev) => {
        if (!card_data.solved && canInteract) {
            card_data.clicked = !card_data.clicked;
            update_nb_clicked();
            //console.log({ nb: nb_clicked, who: card_preparation.filter(card => card.clicked) });
            card_content.classList.remove("hidden");
            if (card_data.clicked) {
                card.style.setProperty("--propag", "40%");
            } else {
                card_content.classList.add("hidden");
                card.style.setProperty("--propag", "25%");
            }
            if (nb_clicked == 3) {
                window.dispatchEvent(compare_words_event)
            }
        }
    });

    // Add the elements to the DOM
    card.appendChild(card_content);
    cardzone.appendChild(card);
});
document.getElementById('btn-show-nb-clicked')?.addEventListener('click', () => console.log({ nb: nb_clicked, who: card_preparation.filter(card => card.clicked) }))