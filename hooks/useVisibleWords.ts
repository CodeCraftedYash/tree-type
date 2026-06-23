import {useMemo} from "react";

type Props = {
  words: string[];
  currentWordIndex: number;
};
// word is a full paragraph , we need to slice it based on current word index , 0->60, when at 40 : first + 20 , last + 20

export default function useVisibleWords({ words, currentWordIndex }: Props) {
  const WINDOW_SIZE = 34;
  const SHIFT_AMOUNT = 10;
const SHIFT_THRESHOLD = 20;
  const windowStart =
  currentWordIndex < SHIFT_THRESHOLD
    ? 0
    : Math.floor(
        (currentWordIndex - SHIFT_THRESHOLD) / SHIFT_AMOUNT + 1
      ) * SHIFT_AMOUNT;
  const visibleWords = useMemo(
  () => words.slice(windowStart, windowStart + WINDOW_SIZE),
  [words, windowStart]
);

  return { visibleWords, windowStart };
}
