export const shuffle_array = (array: any[]) => {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
};
export const wait = async (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time));
};
export const nb_words_from_URL = parseInt(
    new URL(window.location.href).searchParams.get("nb_words") || ""
);
export const debug_enabled =
    new URL(window.location.href).searchParams.get("debug_mode") == "TRUE";
export interface WordsDisplayList {
    word: string;
    lang: "occitan" | "espagnol" | "latin" | "fr";
    clicked: boolean;
    solved: boolean;
    idword: number;
    id: number;
    element?: HTMLElement;
}
export const prefetch_image = (img_url: string) => {
    const img = new Image();
    img.src = img_url;
};
