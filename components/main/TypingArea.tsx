import type { typedCharacters } from "@/types/typedChar.type";
import { RefObject } from "react";

type props = {
    words:string[];
    typedCharacters:typedCharacters[];
    currentWordIndex: number;
    currentCharacterIndex: number;
    activeCharRef: RefObject<HTMLSpanElement | null>;
    
}
const TypingArea = ({words,typedCharacters,currentWordIndex,currentCharacterIndex,activeCharRef}:props) => {
  return (
    <div className="flex flex-wrap gap-x-3 relative" style={{fontSize:"var(--text-size)"}}>
    {words.map((word, wordIndex) => {
          return (
            <div key={wordIndex} className="whitespace-nowrap">
              {word.split("").map((char, charIndex) => {
                const typedCharacter = typedCharacters.find(
                  (item) =>
                    item.wordIndex === wordIndex &&
                    item.charIndex === charIndex,
                );

                const isCurrentChar =
                  currentWordIndex === wordIndex &&
                  currentCharacterIndex === charIndex;

                return (
                  <span
                    key={charIndex}
                    ref={isCurrentChar ? activeCharRef : null}
                    style={{
                      color:
                        typedCharacter === undefined
                          ? "gray"
                          : typedCharacter.correct
                            ? "white"
                            : "red",
                    }}
                  >
                    {char}
                  </span>
                );
              })}

              {/* REAL SPACE */}
              {wordIndex !== words.length - 1 && <span> </span>}
            </div>
          );
        })}
        </div>
  )
}

export default TypingArea