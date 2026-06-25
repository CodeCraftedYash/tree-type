import { initialTypingState } from "@/constants/initialTypingState";
import { typingReducer } from "@/reducers/typingReducer";
import { useEffect, useMemo, useReducer } from "react";
import useGetParagraph from "./useGetParagraph";

export default function useTypingEngine(start: () => void) {
  const {para,fetchParagraph} = useGetParagraph()??"";
  const paragraph = para
    .toLowerCase()
    .replace(/[^a-zA-Z\s]/g, "")
    .replace(/\s+/g, " ")
    .trim()
  const words = useMemo(()=> paragraph ? paragraph.split(" ") : [],[paragraph])
  const [state, dispatch] = useReducer(typingReducer, initialTypingState);

  //engine
  useEffect(() => {
    if (state.isFinished) return;
    function gotoNextWord() {
      if (state.currentWordIndex >= words.length - 1) return;
      dispatch({ type: "NEXT_WORD" });
    }

    function gotoPreviousWord() {
      const previousWordLength = state.currentWordIndex - 1;
      dispatch({
        type: "PREVIOUS_WORD",
        payload: { previousWordLength: words[previousWordLength].length },
      });
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (state.isFinished) return;
      if (words.length === 0) return;
      const val = e.key;
      const expectedChar =
        state.currentCharacterIndex < words[state.currentWordIndex].length
          ? words[state.currentWordIndex][state.currentCharacterIndex]
          : " ";
      const isCorrect = val === expectedChar;
      const key = `${state.currentWordIndex}-${state.currentCharacterIndex}`;

      // handle backspace
      if (val === "Backspace") {
        if (state.currentCharacterIndex === 0 && state.currentWordIndex === 0)
          return;
        if (state.currentCharacterIndex > 0) {
          const prevIndex = state.currentCharacterIndex - 1;
          const prevKey = `${state.currentWordIndex}-${prevIndex}`;
          dispatch({ type: "BACKSPACE", payload: { key: prevKey } });
          return;
        }

        gotoPreviousWord();
        return;
      }

      // handle spacebar
      if (val === " ") {
        if (
          state.currentCharacterIndex === words[state.currentWordIndex].length
        ) {
          gotoNextWord();
        } else {
          dispatch({
            type: "TYPE_CHARACTER",
            payload: {
              char: val,
              correct: isCorrect,
              expectedChar: expectedChar,
              key: key,
            },
          });
        }
        return;
      }

      //for keys like shift, control, alt, etc whose length is greater than 1
      if (val.length > 1) {
        return;
      }

      if (!state.isStarted) {
        start(); // this will start the timer from the useTimer hook
      }

      //for the very last character, this will prevent more entries if we are at the last charater of a word
      if (state.currentCharacterIndex >= words[state.currentWordIndex].length) {
        return;
      }

      //adding normal characters
      dispatch({
        type: "TYPE_CHARACTER",
        payload: {
          char: val,
          correct: isCorrect,
          expectedChar: expectedChar,
          key: key,
        },
      });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    state.currentCharacterIndex,
    state.currentWordIndex,
    state.isFinished,
    state.isStarted,
    words,
  ]);

  function resetTyping() {
    dispatch({ type: "RESET" });
  }

  function finishTyping() {
    dispatch({ type: "FINISHED" });
  }

  return {
    words,
    currentCharacterIndex: state.currentCharacterIndex,
    currentWordIndex: state.currentWordIndex,
    typedCharacters: state.typedCharacters,
    correctCharacters: state.correctCharacters,
    incorrectCharacters: state.incorrectCharacters,
    isStarted: state.isStarted,
    isFinished: state.isFinished,
    resetTyping,
    finishTyping,
    fetchParagraph
  };
}
