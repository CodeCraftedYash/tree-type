"use client";

import Grid from "@/components/background/Grid";
import Caret from "@/components/main/Caret";
import Reset from "@/components/main/Reset";
import Stats from "@/components/main/Stats";
import TypingArea from "@/components/main/TypingArea";
import useStats from "@/hooks/useStats";
import useTimer from "@/hooks/useTimer";
import useTypingEngine from "@/hooks/useTypingEngine";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Home() {
  const [caretStyle, setCaretStyle] = useState({ left: 0, top: 0, height: 0 });
  const activeCharRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timeLimit = 15;
  const {timer, start, resetTimer,isRunning} = useTimer(timeLimit);
  const {words,currentCharacterIndex,currentWordIndex,typedCharacters,resetTyping,finishTyping,correctCharacters,incorrectCharacters} = useTypingEngine(start);
  const {acc,wpm} = useStats({ correctCharacters,
  incorrectCharacters,
  timer,
  timeLimit,})
   
  // finish Typing
   useEffect(() => {
  if (timer === 0 && isRunning) {
    finishTyping();
  }
}, [timer, isRunning]);

  // Reset
  function reset(e: React.MouseEvent<HTMLButtonElement>) {
    if (e.currentTarget) {
      e.currentTarget.blur();
    }
    resetTyping();
    resetTimer();
  }
  // caret logic
  useLayoutEffect(() => {
    const activeLetter = activeCharRef.current;

    const container = containerRef.current;

    if (!activeLetter || !container) return;

    const rect = activeLetter.getBoundingClientRect();

    const containerRect = container.getBoundingClientRect();

    setCaretStyle({
      left: rect.left - containerRect.left,

      top: rect.top - containerRect.top,

      height: rect.height,
    });
  }, [currentCharacterIndex, currentWordIndex]);

  return (
    <div className="w-full relative h-full overflow-x-hidden grow">

      <Stats timer={timer} acc={acc} wpm={wpm} />
      <div
        ref={containerRef}
        className="w-2/3 mx-auto mt-20 text-4xl flex flex-wrap gap-x-3 relative">
        <Caret caretStyle={caretStyle}/>
        {/* WORDS */}
        <TypingArea words={words} typedCharacters={typedCharacters} currentWordIndex={currentWordIndex} currentCharacterIndex={currentCharacterIndex} activeCharRef={activeCharRef} />
      </div>
       {/* Reset Button */}
        <div className=" mt-20 w-fit mx-auto"><Reset reset={reset}/></div>
        <Grid />
    </div>
  );
}
