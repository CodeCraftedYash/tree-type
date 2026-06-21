import { RefObject, useLayoutEffect, useState } from "react";

type Props = {
    activeCharRef: RefObject<HTMLSpanElement | null>;
    containerRef: RefObject<HTMLDivElement | null>;
    currentCharacterIndex:number;
    currentWordIndex:number
}

export default function useCaretPosition({activeCharRef,containerRef,currentCharacterIndex,currentWordIndex}:Props) {
  const [caretStyle, setCaretStyle] = useState({ left: 0, top: 0, height: 0 });

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
  }, [currentCharacterIndex, currentWordIndex,activeCharRef,containerRef]);

  return caretStyle;
}
