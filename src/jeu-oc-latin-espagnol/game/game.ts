import "./style.css";
import "../../style.css";
import {
    card_preparation,
    francais_translation,
    img_list,
} from "../libs/words";
import { wait, nb_words_from_URL, debug_enabled as debug } from "../libs/libs";

let nb_clicked = card_preparation.filter(
    (card_data) => card_data.clicked
).length;
const start_time = Date.now();
const update_nb_clicked = () => {
    nb_clicked = card_preparation.filter(
        (card_data) => card_data.clicked
    ).length;
};
let tiles_done = [];
const update_score = (score: number) => {
    const e = document.getElementById("score-display") as HTMLBaseElement;
    e.innerText = score.toString();
};
const update_timer = () => {
    let time_now = Date.now(),
        difference = time_now - start_time,
        seconds_total = difference / 1000,
        minutes = Math.floor(seconds_total / 60),
        seconds = seconds_total - minutes * 60;
    if (seconds == 60) {
        // When the seconds are at 60, minutes are -1 where they need to be so seconds = 0 and timer is minutes+1:0
        seconds = 0;
        minutes++;
    }
    const e = document.getElementById("time-display") as HTMLBaseElement;
    e.innerText = `${minutes.toFixed(0)}:${"0".repeat(
        Math.abs(seconds.toFixed(0).length - 2)
    )}${seconds.toFixed(0)}`; //`${minutes.toFixed(0)}:${seconds.toFixed(0)}`;
    return [minutes.toFixed(0), seconds.toFixed(0)];
};
const update_card_status = (card_id: number) => {
    const card_data = card_preparation[card_id];
    if (card_data.clicked) {
    }
    const card_content = card_data.element as HTMLElement;
    const card_content_child = card_content.firstChild as HTMLElement;
    card_content_child.classList.remove("hidden");
    if (card_data.clicked) {
        card_content.style.setProperty("--propag", "40%");
    } else {
        card_content_child.classList.add("hidden");
        card_content.style.setProperty("--propag", "25%");
    }
};
let canInteract = true,
    score = 0;
const body_element = document.getElementsByTagName(
    "body"
)[0] as HTMLBodyElement;
const dialog_box = document.getElementById("response-box") as HTMLDialogElement;
const compare_words_event = new Event("compare_words");
window.addEventListener("compare_words", async () => {
    canInteract = false;
    if (debug) {
        console.log("3 words clicked");
    }
    const clicked_cards = card_preparation.filter(
        (card_data) => card_data.clicked
    );
    if (debug) {
        console.log(clicked_cards);
    }
    await wait(500);
    if (debug) {
        console.log("done waiting");
    }
    clicked_cards.forEach((card) => {
        card_preparation[card.id].clicked = false;
        card_preparation[card.id].element
            ?.getElementsByTagName("p")[0]
            .classList.add("hidden");
        card_preparation[card.id].element?.style.setProperty("--propag", "25%");
    });
    // Verify if they are the same words
    if (
        clicked_cards[0].idword == clicked_cards[1].idword &&
        clicked_cards[1].idword == clicked_cards[2].idword
    ) {
        tiles_done.push(clicked_cards[0].idword);
        clicked_cards.forEach((card) => {
            card_preparation[card.id].solved = true;
            card_preparation[card.id].element
                ?.getElementsByTagName("p")[0]
                .classList.remove("hidden");
            card_preparation[card.id].element?.style.setProperty(
                "--propag",
                "40%"
            );
            card_preparation[card.id].element?.style.setProperty(
                "--valid-propag",
                "80%"
            );
        });
        // Setting up the dialog box
        let prepared_dialog_html = `<div class="dialog-img-container"><img id="dialog-img" alt="Une image de ${
            francais_translation[clicked_cards[0].idword]
        }"></div><div class="dialog-bottom-part"><p>Cela veut dire: ${
            francais_translation[clicked_cards[0].idword]
        }</p>`;

        if (tiles_done.length == nb_words_from_URL) {
            let time_end = update_timer(),
                formated_time_end =
                    time_end[0] == "0"
                        ? `${time_end[1]} secondes`
                        : `${time_end[0]} minutes et ${time_end[1]} secondes`;
            console.log(
                `Jeu terminé en ${formated_time_end} et avec ${
                    score + 1
                } essai(s)`
            );
            clearInterval(time_updater);
            prepared_dialog_html += `<p>Vous avez gagné en ${formated_time_end} avec un ${
                score + 1
            } essai(s) pour ${nb_words_from_URL} triplets de mots</p>`;
        }
        prepared_dialog_html += `<button id="dialog-close">Fermer</button></div>`;
        dialog_box.innerHTML = prepared_dialog_html;
        // Defining image and button
        (
            document.getElementById("dialog-close") as HTMLButtonElement
        ).addEventListener("click", () => {
            dialog_box.close();
            body_element.classList.remove("blur");
        });
        (document.getElementById("dialog-img") as HTMLImageElement).src =
            img_list[clicked_cards[0].idword];

        // Show the dialog box
        dialog_box.show();
    }
    score++;
    update_score(score);
    canInteract = true;
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
    card_data.element = card;
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
            break;
    }

    // Add Click interaction
    card.addEventListener("click", (_ev) => {
        if (!card_data.solved && canInteract) {
            const list_selected = card_preparation.filter(
                (card_data) => card_data.clicked
            );
            const list_lang_selected = list_selected.map((e) => e.lang);
            if (list_lang_selected.includes(card_data.lang)) {
                list_selected.forEach((card) => {
                    if (card.lang == card_data.lang) {
                        card.clicked = !card.clicked;
                        update_card_status(card.id);
                    }
                });
                console.log("Switching the one clicked");
            }
            card_data.clicked = !card_data.clicked;
            update_nb_clicked();
            //console.log({ nb: nb_clicked, who: card_preparation.filter(card => card.clicked) });
            update_card_status(card_data.id);
            if (nb_clicked == 3) {
                window.dispatchEvent(compare_words_event);
            }
        }
    });

    // Add the elements to the DOM
    card.appendChild(card_content);
    cardzone.appendChild(card);
});
document.getElementById("btn-show-nb-clicked")?.addEventListener("click", () =>
    console.log({
        nb: nb_clicked,
        who: card_preparation.filter((card) => card.clicked),
    })
);
let time_updater = setInterval(update_timer, 1000);
update_score(score);
