import { useEffect, useState } from "react";

export default function useTypingEngine() {
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
  // timer
  const timeLimit = 15;
  const [timer, setTimer] = useState(timeLimit);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

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
      //timer
      if (!isStarted) setIsStarted(true);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentCharacterIndex, currentWordIndex, isFinished, isStarted]);

  // Timer

  useEffect(() => {
    if (!isStarted || isFinished) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);

          setIsFinished(true);
          setIsStarted(false);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isStarted, isFinished]);

  // Accuracy

  const correctCharacters = typedCharacters.filter(
    (item) => item.correct,
  ).length;

  const acc =
    typedCharacters.length === 0
      ? 0
      : Math.round((correctCharacters / typedCharacters.length) * 100);

  // WPM

  const elapsedMinutes = (timeLimit - timer) / 60;

  const wpm =
    elapsedMinutes > 0 ? Math.round(correctCharacters / 5 / elapsedMinutes) : 0;

  // Reset

  function reset(e: React.MouseEvent<HTMLButtonElement>) {
    console.log("reset hit");
    if (e.currentTarget) {
      e.currentTarget.blur();
    }
    setIsFinished(false);
    setIsStarted(false);
    setTimer(timeLimit);
    setCurrentCharacterIndex(0);
    setCurrentWordIndex(0);
    setTypedCharacters([]);
  }

  return {
    words,
    currentCharacterIndex,
    currentWordIndex,
    typedCharacters,
    timer,
    acc,
    wpm,
    reset,
  };
}
