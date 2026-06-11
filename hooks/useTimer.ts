import { useEffect, useState } from "react";

export default function useTimer(timeLimit:number = 15) {
  const [timer, setTimer] = useState(timeLimit);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

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


  function resetTimer (){
    setIsFinished(false);
    setIsStarted(false);
    setTimer(timeLimit);
  }

  function start() {
  setIsStarted(true);
}

  return({timer, isStarted, isFinished, resetTimer,start});

}