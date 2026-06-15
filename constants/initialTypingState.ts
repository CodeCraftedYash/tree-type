import { TypingState } from "@/types/typedChar.type";

//this is the state that we are using in the reducer hook for the typing engine

export const initialTypingState: TypingState = {
  currentWordIndex: 0,
  currentCharacterIndex: 0,
  typedCharacters: new Map(),
  correctCharacters: 0,
  incorrectCharacters: 0,
  isStarted:false,
  isFinished:false,
};