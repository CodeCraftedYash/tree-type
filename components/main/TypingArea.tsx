import type { TypedCharacter } from "@/types/typedChar.type";
import { RefObject } from "react";
import Character from "../layout/Character";

type props = {
  words: string[];
  typedCharacters: Map<string, TypedCharacter>;
  currentWordIndex: number;
  currentCharacterIndex: number;
  activeCharRef: RefObject<HTMLSpanElement | null>;
};
const TypingArea = ({
  words,
  typedCharacters,
  currentWordIndex,
  currentCharacterIndex,
  activeCharRef,
}: props) => {
  return (
    <div
      className="flex flex-wrap gap-x-3 relative"
      style={{ fontSize: "var(--text-size)" }}
    >
      {words.map((word, wordIndex) => {
        return (
          <div key={wordIndex} className="whitespace-nowrap">
            {word.split("").map((char, charIndex) => {
              const typedCharacter = typedCharacters.get(
                `${wordIndex}-${charIndex}`,
              );

              const isCurrentChar =
                currentWordIndex === wordIndex &&
                currentCharacterIndex === charIndex;

              return (
                <Character
                  key={`${wordIndex}-${charIndex}`}
                  char={char}
                  typedCharacter={typedCharacter}
                  isCurrentChar={isCurrentChar}
                  activeCharRef={activeCharRef}
                />
              );
            })}

            {/* REAL SPACE */}
            {wordIndex !== words.length - 1 && <span> </span>}
          </div>
        );
      })}
    </div>
  );
};

export default TypingArea;
