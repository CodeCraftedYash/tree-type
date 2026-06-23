"use client";

import Grid from "@/components/background/Grid";
import Settings from "@/components/layout/Settings";
import Caret from "@/components/main/Caret";
import Reset from "@/components/main/Reset";
import Stats from "@/components/main/Stats";
import TypingArea from "@/components/main/TypingArea";
import useCaretPosition from "@/hooks/useCaretStyle";
import useStats from "@/hooks/useStats";
import useTimer from "@/hooks/useTimer";
import useTypingEngine from "@/hooks/useTypingEngine";
import useVisibleWords from "@/hooks/useVisibleWords";
import { useEffect,useRef, useState } from "react";

export default function Home() {
  const activeCharRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [timeLimit,setTimeLimit] = useState(15); 
  const {timer, start, resetTimer,isRunning,handleTimeLimitChange} = useTimer(timeLimit,setTimeLimit);
  const {words,currentCharacterIndex,currentWordIndex,typedCharacters,resetTyping,finishTyping,correctCharacters,incorrectCharacters,isFinished} = useTypingEngine(start);
  const caretStyle = useCaretPosition({activeCharRef,containerRef,currentCharacterIndex,currentWordIndex})
  const {acc,wpm} = useStats({ correctCharacters,
  incorrectCharacters,
  timer,
  timeLimit,});
  const {visibleWords,windowStart} = useVisibleWords({words,currentWordIndex})
  // finish Typing
   useEffect(() => {
  if (timer === 0 && isRunning) {
    finishTyping();
  }
}, [timer, isRunning, isFinished]);

  // Reset
  function reset(e: React.MouseEvent<HTMLButtonElement>) {
    if (e.currentTarget) {
      e.currentTarget.blur();
    }
    resetTyping();
    resetTimer();
  }

  return (
    <div className="w-full relative h-full overflow-x-hidden grow">

      <div className="flex w-full px-20">
        <Stats timer={timer} acc={acc} wpm={wpm} />
        <Settings timeLimit={timeLimit} isRunning={isRunning} handleTimeLimitChange={handleTimeLimitChange}/>
      </div>
      <div
        ref={containerRef}
        className="w-2/3 mx-auto mt-20 text-4xl flex flex-wrap gap-x-3 relative select-none">
        { visibleWords ? <div> 
          <TypingArea words={visibleWords} windowStart={windowStart} typedCharacters={typedCharacters} currentWordIndex={currentWordIndex} currentCharacterIndex={currentCharacterIndex} activeCharRef={activeCharRef} />
          <Caret caretStyle={caretStyle}/>
        </div> : "Loading..."}
      </div>
       {/* Reset Button */}
        <div className=" mt-20 w-fit mx-auto"><Reset reset={reset}/></div>
        <Grid />
    </div>
  );
}
