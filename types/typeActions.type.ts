export type TypingAction =
  | {
      type: "TYPE_CHARACTER";
      payload: {
        key: string;
        char: string;
        expectedChar: string;
        correct: boolean;
      };
    }
  | {
      type: "BACKSPACE";
      payload: {
        key: string;
      };
    }
  | {
      type: "NEXT_WORD";
    }
  | {
      type: "PREVIOUS_WORD";
      payload: {
        previousWordLength: number;
      };
    }
  | {
      type: "RESET";
    }
  | {
      type: "FINISHED";
    }