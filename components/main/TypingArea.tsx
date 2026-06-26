import type { TypedCharacter } from "@/types/typedChar.type";
import { memo, RefObject } from "react";
import Character from "../layout/Character";

type props = {
  words: string[];
  typedCharacters: Map<string, TypedCharacter>;
  currentWordIndex: number;
  currentCharacterIndex: number;
  activeCharRef: RefObject<HTMLSpanElement | null>;
  windowStart:number;
};
const TypingArea = memo(function TypingArea({
  words,
  typedCharacters,
  currentWordIndex,
  currentCharacterIndex,
  activeCharRef,
  windowStart
}: props){
  return (
    <div
      className="flex flex-wrap gap-x-3 relative h-50 "
      style={{ fontSize: "var(--text-size)" }}
    >
      {words.map((word, wordIndex) => {
        const realWordIndex = wordIndex + windowStart;
        return (
          <div key={wordIndex} className="whitespace-nowrap">
            {word.split("").map((char, charIndex) => {
              const typedCharacter = typedCharacters.get(
                `${realWordIndex}-${charIndex}`,
              );

              const isCurrentChar =
                currentWordIndex === realWordIndex &&
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
});

export default TypingArea;
