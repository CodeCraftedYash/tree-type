import { memo, RefObject } from "react";

type Props = {
  char: string;
  typedCharacter?: {
    correct: boolean;
  };
  isCurrentChar: boolean;
  activeCharRef: RefObject<HTMLSpanElement | null>;
};

const Character = memo(function Character({
  char,
  typedCharacter,
  isCurrentChar,
  activeCharRef,
}: Props) {
  return (
    <span
      ref={isCurrentChar ? activeCharRef : null}
      style={{
        color:
          typedCharacter === undefined
            ? "gray"
            : typedCharacter.correct
              ? "white"
              : "red",
      }}
    >
      {char}
    </span>
  );
});

export default Character;