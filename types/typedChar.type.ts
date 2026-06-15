export type TypedCharacter = {
  char: string;
  expectedChar: string;
  correct: boolean;
  charIndex?: number;
  wordIndex?: number;
};

export type TypingState = {
  currentWordIndex: number;
  currentCharacterIndex: number;
  typedCharacters: Map<string, TypedCharacter>;
  correctCharacters: number;
  incorrectCharacters: number;
  isStarted: boolean;
  isFinished: boolean;
};