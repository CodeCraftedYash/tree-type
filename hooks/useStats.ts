import { typedCharacters } from "@/types/typedChar.type";

type props = {
    typedCharacters:typedCharacters[];
    timer:number;
    timeLimit:number;
}
export default function useStats({typedCharacters,timer,timeLimit}:props){
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

    return { wpm, acc }
}