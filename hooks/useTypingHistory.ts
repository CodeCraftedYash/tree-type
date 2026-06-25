import { Dispatch, SetStateAction, useEffect } from "react";

export type HistoryPoint = {
  second: number;
  correctCharacters: number;
  incorrectCharacters: number;
};

type Props = {
  isRunning: boolean;
  timeLimit: number;
  timer: number;
  correctCharacters: number;
  incorrectCharacters: number;
  setHistory: Dispatch<SetStateAction<HistoryPoint[]>>;
};

export default function useTypingHistory({
  isRunning,
  timeLimit,
  timer,
  correctCharacters,
  incorrectCharacters,
  setHistory,
}: Props): void {
  useEffect(() => {
    if (!isRunning) return;

    setHistory((prev) => [
      ...prev,
      {
        second: timeLimit - timer,
        correctCharacters,
        incorrectCharacters,
      },
    ]);
  }, [timer, isRunning]);
}