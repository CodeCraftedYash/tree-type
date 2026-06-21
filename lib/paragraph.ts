import { paragraphs } from "@/constants/paragraphs";

export function getRandomParagraphs() {
    const randomIndex = Math.floor( Math.random() * (paragraphs.length - 1) );
    return paragraphs[randomIndex];
}