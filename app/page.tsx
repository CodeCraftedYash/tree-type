"use client";

import Blur from "@/components/background/Blur";
import Grid from "@/components/background/Grid";
import Loading from "@/components/layout/Loading";
import Result from "@/components/layout/Result";
import Settings from "@/components/layout/Settings";
import Caret from "@/components/main/Caret";
import Reset from "@/components/main/Reset";
import Stats from "@/components/main/Stats";
import TypingArea from "@/components/main/TypingArea";
import useCaretPosition from "@/hooks/useCaretStyle";
import useStats from "@/hooks/useStats";
import useTimer from "@/hooks/useTimer";
import useTypingEngine from "@/hooks/useTypingEngine";
import useTypingHistory from "@/hooks/useTypingHistory";
import useVisibleWords from "@/hooks/useVisibleWords";
import { HistoryPoint } from "@/types/historyPoints.type";
import { useEffect, useRef, useState } from "react";
import { GrLinkNext } from "react-icons/gr";

export default function Home() {
  const activeCharRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [timeLimit, setTimeLimit] = useState(15);
  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const { timer, start, resetTimer, isRunning, handleTimeLimitChange } =
    useTimer(timeLimit, setTimeLimit);
  const {
    words,
    currentCharacterIndex,
    currentWordIndex,
    typedCharacters,
    resetTyping,
    finishTyping,
    correctCharacters,
    incorrectCharacters,
    isFinished,
    fetchParagraph,
    loading
  } = useTypingEngine(start);
  const caretStyle = useCaretPosition({
    activeCharRef,
    containerRef,
    currentCharacterIndex,
    currentWordIndex,
  });
  const { acc, wpm } = useStats({
    correctCharacters,
    incorrectCharacters,
    timer,
    timeLimit,
  });
  useTypingHistory({
    correctCharacters,
    incorrectCharacters,
    isRunning,
    setHistory,
    timeLimit,
    timer,
  });
  const { visibleWords, windowStart } = useVisibleWords({
    words,
    currentWordIndex,
  });
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
    if (!history) return;
    resetTyping();
    resetTimer();
    setHistory([]);
  }

  function next(e: React.MouseEvent<HTMLButtonElement>) {
    if (e.currentTarget) e.currentTarget.blur();
    if (!history) return;
    resetTyping();
    resetTimer();
    fetchParagraph();
    setHistory([]);
  }

  return (
    <div className="w-full relative h-full overflow-x-hidden grow">
      {isFinished || loading && <Blur />}
      {isFinished && (
        <div className="absolute w-full h-[95%] top-0 left-0">
          <Result
            history={history}
            correctCharacters={correctCharacters}
            incorrectCharacters={incorrectCharacters}
            timeLimit={timeLimit}
            reset={reset}
            next={next}
          />
        </div>
      )}
      <div className="flex w-full px-20">
        <Stats timer={timer} acc={acc} wpm={wpm} />
        <Settings
          timeLimit={timeLimit}
          isRunning={isRunning}
          handleTimeLimitChange={handleTimeLimitChange}
        />
      </div>
      <div
        ref={containerRef}
        className="w-2/3 mx-auto mt-20 text-4xl flex flex-wrap gap-x-3 relative select-none"
      >
        {visibleWords && 
          <div>
            <TypingArea
              words={visibleWords}
              windowStart={windowStart}
              typedCharacters={typedCharacters}
              currentWordIndex={currentWordIndex}
              currentCharacterIndex={currentCharacterIndex}
              activeCharRef={activeCharRef}
            />
            <Caret caretStyle={caretStyle} />
            {loading && <Loading />}
          </div>
        }
      </div>
      <div className="flex items-center mt-32 w-fit mx-auto gap-10">
        <div className="w-fit mx-auto">
          <Reset reset={reset} />
        </div>
        <div className="w-fit mx-auto">
          <button
            className="hover:cursor-pointer border p-2 rounded-xl hover:scale-110 transition-all duration-100 ease-in-out px-4 hover:text-(--accent)"
            onClick={next}
          >
            <GrLinkNext />
          </button>
        </div>
      </div>
      <Grid />
    </div>
  );
}
