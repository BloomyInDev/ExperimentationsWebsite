import data from "./words.json";
import { shuffle_array, WordsDisplayList } from "./libs";
const words = data.words
const shuffled_words = shuffle_array(words);

const nb_words_from_URL = parseInt((new URL(window.location.href)).searchParams.get('nb_words') || '');

let selected_words = shuffled_words.slice(0, nb_words_from_URL || data.nb_words);

export let card_preparation: WordsDisplayList[] = [];
for (let i = 0; i < selected_words.length; i++) {
    const word = selected_words[i];
    card_preparation.push({
        word: word.oc,
        lang: "occitan",
        clicked: false,
        solved:false,
        idword: i,
        id: card_preparation.length
    });
    card_preparation.push({
        word:word.fr,
        lang:"fr",
        //word: word.espagnol,
        //lang: "espagnol",
        clicked: false,
        solved:false,
        idword: i,
        id: card_preparation.length
    });
    card_preparation.push({
        word: word.latin,
        lang: "latin",
        clicked: false,
        solved:false,
        idword: i,
        id: card_preparation.length
    });
}
card_preparation = shuffle_array(card_preparation)
for (let i = 0; i < card_preparation.length; i++) {
    card_preparation[i].id = i
}
console.table(card_preparation.map(card=>{return {word:card.word,lang:card.lang,idword:card.idword,id:card.id}}));

export const img_list = words.map(word=>word.image);
export let francais_translation = words.map(word => word.fr);


