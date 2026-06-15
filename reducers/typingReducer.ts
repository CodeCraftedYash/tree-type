import { initialTypingState } from "@/constants/initialTypingState";
import { TypingAction } from "@/types/typeActions.type";
import { TypingState } from "@/types/typedChar.type";

export function typingReducer(
  state: TypingState,
  action: TypingAction,
): TypingState {
  switch (action.type) {
    case "TYPE_CHARACTER": {
      const { key, char, expectedChar, correct } = action.payload;
      const nextMap = new Map(state.typedCharacters);
      nextMap.set(key, {
        char,
        expectedChar,
        correct,
      });
      return {
        ...state,
        isStarted: true,
        typedCharacters: nextMap,
        currentCharacterIndex: state.currentCharacterIndex + 1,
        correctCharacters: state.correctCharacters + (correct ? 1 : 0),
        incorrectCharacters: state.incorrectCharacters + (correct ? 0 : 1),
      };
    }

    case "BACKSPACE": {
      const typedChar = state.typedCharacters.get(action.payload.key);
      const nextMap = new Map(state.typedCharacters);
      nextMap.delete(action.payload.key);

      return {
        ...state,
        typedCharacters: nextMap,
        currentCharacterIndex: state.currentCharacterIndex - 1,
        correctCharacters:
          state.correctCharacters - (typedChar?.correct ? 1 : 0),

        incorrectCharacters:
          state.incorrectCharacters - (typedChar && !typedChar.correct ? 1 : 0),
      };
    }

    case "NEXT_WORD": {
      return {
        ...state,
        currentWordIndex: state.currentWordIndex + 1,
        currentCharacterIndex: 0,
      };
    }

    case "PREVIOUS_WORD": {
      return {
        ...state,
        currentWordIndex: state.currentWordIndex - 1,
        currentCharacterIndex: action.payload.previousWordLength,
      };
    }

    case "FINISHED": {
      return {
        ...state,
        isFinished: true,
      };
    }

    case "RESET": {
      return initialTypingState;
    }
    default: {
      return state;
    }
  }
}
