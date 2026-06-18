import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function useTimer(
  timeLimit: number = 15,
  setTimeLimit: Dispatch<SetStateAction<number>>
) {
  const [timer, setTimer] = useState(timeLimit);
  const [isRunning, setIsRunning] =
    useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  function start() {
    setIsRunning(true);
  }

  function resetTimer() {
    setTimer(timeLimit);
    setTimeLimit(timeLimit);
    setIsRunning(false);
  }

  function handleTimeLimitChange(limit:number){
    setTimeLimit(limit)
    setTimer(limit);
    setIsRunning(false);
  }

  return {
    timer,
    start,
    resetTimer,
    isRunning,
    handleTimeLimitChange
  };
}