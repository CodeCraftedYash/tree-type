import { useEffect, useState } from "react";

export default function useTypingEngine(isFinished:boolean,isStarted:boolean,start:()=>void) {
  const paragraph =
    "even if things do not go as you would hoped you can still enjoy the process that alone is enough to put someone in a good mood"
      .replace(/[’‘]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/\s+/g, " ")
      .trim();
  const words = paragraph.split(" ");
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedCharacters, setTypedCharacters] = useState<
    {
      char: string;
      expectedChar: string;
      correct: boolean;
      charIndex: number;
      wordIndex: number;
    }[]
  >([]);
  
  //engine

  useEffect(() => {
    if (isFinished) return;
    function gotoNextWord() {
      if (currentWordIndex >= words.length - 1) return;
      setCurrentCharacterIndex(0);
      setCurrentWordIndex((prev) => prev + 1);
    }
    function gotoPreviousWord() {
      const prevWord = currentWordIndex - 1;
      setCurrentWordIndex(prevWord);
      setCurrentCharacterIndex(words[prevWord].length - 1);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFinished) return;
      const val = e.key;
      const expectedChar =
        currentCharacterIndex < words[currentWordIndex].length
          ? words[currentWordIndex][currentCharacterIndex]
          : " ";
      const isCorrect = val === expectedChar;

      // handle backspace
      if (val === "Backspace") {
        console.log("backspace hit");
        if (currentCharacterIndex === 0 && currentWordIndex === 0) return;
        setTypedCharacters((prev) => prev.slice(0, -1));
        if (currentCharacterIndex === 0) gotoPreviousWord();
        else setCurrentCharacterIndex((prev) => prev - 1);
        return;
      }

      // handle spacebar
      if (val === " ") {
        console.log("spacebar hit");
        if (currentCharacterIndex === words[currentWordIndex].length) {
          gotoNextWord();
        } else {
          setCurrentCharacterIndex((prev) => prev + 1);
          setTypedCharacters((prev) => [
            ...prev,
            {
              char: val,
              charIndex: currentCharacterIndex,
              correct: isCorrect,
              expectedChar,
              wordIndex: currentWordIndex,
            },
          ]);
        }
        return;
      }

      if (val.length > 1) {
        return;
      }
      if (currentCharacterIndex >= words[currentWordIndex].length) {
        return;
      }
      setTypedCharacters((prev) => [
        ...prev,
        {
          char: val,
          charIndex: currentCharacterIndex,
          correct: isCorrect,
          expectedChar: expectedChar,
          wordIndex: currentWordIndex,
        },
      ]);
      setCurrentCharacterIndex((prev) => prev + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    start();
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentCharacterIndex, currentWordIndex, isFinished, isStarted]);

function resetTyping() {
      setCurrentCharacterIndex(0);
      setCurrentWordIndex(0);
      setTypedCharacters([]);
}

  return {
    words,
    currentCharacterIndex,
    currentWordIndex,
    typedCharacters,
    resetTyping
  };
}
