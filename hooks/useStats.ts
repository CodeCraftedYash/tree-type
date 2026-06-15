type Props = {
  correctCharacters: number;
  incorrectCharacters: number;
  timer: number;
  timeLimit: number;
};

export default function useStats({
  correctCharacters,
  incorrectCharacters,
  timer,
  timeLimit,
}: Props) {
  const totalTyped =
    correctCharacters + incorrectCharacters;

  const acc =
    totalTyped > 0
      ? Math.round(
          (correctCharacters / totalTyped) * 100
        )
      : 100;

  const elapsedMinutes =
    (timeLimit - timer) / 60;

  const wpm =
    elapsedMinutes > 0
      ? Math.round(
          correctCharacters / 5 / elapsedMinutes
        )
      : 0;

  return {
    acc,
    wpm,
  };
}