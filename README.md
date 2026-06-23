# 🌲 TreeType

TreeType is a modern, minimalist typing speed test application inspired by Monkeytype. Built on a modern tech stack, it provides a buttery-smooth, highly responsive environment to measure and improve your typing mechanics.

---

## 🚀 Overview

TreeType is designed to help users elevate their typing speed and accuracy through precision-timed tests. By tracking every single keystroke in real-time, the application calculates live performance metrics and provides instant visual feedback via an ultra-responsive custom caret and character-highlighting engine.

### ⚡ Key Metrics Tracked
* **WPM (Words Per Minute):** Your raw and adjusted typing speed.
* **Accuracy:** Percentage of correct keystrokes over the duration of the test.
* **Consistency:** Tracks your typing rhythm and pacing variance to ensure smooth execution.

---

## ✨ Features

### ⌨️ Core Typing Engine
The backbone of TreeType is a highly responsive, low-latency engine designed to accurately catch and evaluate user inputs.
* **Real-Time Keystroke Tracking:** Monitors inputs instantly without dropping frames or lagging the cursor.
* **Character-by-Character Validation:** Compares inputs against the target text on every stroke for immediate feedback.
* **Advanced Navigation:** Full backspace support alongside seamless word-by-word navigation.
* **Error & Completion Detection:** Tracks mistakes dynamically and handles test completion triggers the millisecond the criteria are met.

### 📊 Real-Time Statistics & Analytics
TreeType tracks performance metrics dynamically throughout the test session to give users immediate feedback.

| Metric | Description |
| :--- | :--- |
| **Words Per Minute (WPM)** | Calculates your current typing speed dynamically. |
| **Accuracy Percentage** | The ratio of correct keystrokes to total attempts. |
| **Character Counters** | Separate precise tracking for both **Correct** and **Incorrect** characters. |
| **Remaining Time** | A precise countdown clock linked to the engine state. |

### 🎨 User Experience & Interface
Inspired by minimal aesthetics to keep the focus entirely on the typing flow.
* **Custom Animated Caret:** A smooth, custom-styled cursor that glides smoothly across characters.
* **Configurable Time Limits:** Flexibility to adjust the length of your typing sessions.
* **Instant Test Reset:** A seamless, distraction-free hotkey or button action to restart instantly.
* **Responsive Layout:** A clean interface that scales beautifully across varying screen sizes.

### 📝 Paragraph & Content System
Behind the scenes, content is processed safely and efficiently before it ever hits the screen.
* **Dynamic Paragraph Loading:** Seamlessly fetches or swaps out new text prompts.
* **Paragraph Sanitization:** Cleans inputs to ensure uniform typography and formatting.
* **Automatic Word Extraction:** Breaks down text strings into isolated, trackable word and character objects.

---

## 🛠️ Tech Stack

### Frontend & Core Architecture
| Technology | Version / Tooling | Role in TreeType |
| :--- | :--- | :--- |
| **Next.js** | `v15` | App router, server-side rendering capability, and fast building. |
| **React** | `v19` | UI component architecture and efficient DOM rendering. |
| **TypeScript** | Strict Mode | Strongly typed components and data shapes for the typing engine. |
| **Tailwind CSS** | Utility-First | Minimalist theme styling, responsive grid, and dark mode aesthetics. |

### 🧠 State Management
To keep the typing engine snappy and ensure sub-millisecond input reaction times, state is kept close to the metal without heavy external libraries:
* **React Hooks (`useState`, `useEffect`):** For localized component lifecycle and event listeners.
* **`useReducer`:** Manages the complex, interconnected states of the typing engine (e.g., `IDLE`, `TYPING`, `COMPLETED`, `PAUSED`) in a single, predictable state machine.

### ⚡ Performance Optimization
Typing apps require extreme frame-rate stability. Every keystroke counts. TreeType uses precise optimization patterns to prevent unnecessary re-renders:
* **`React.memo`:** Prevents expensive re-renders of already-typed words or letters in the paragraph array.
* **`useMemo` / `useCallback`:** Memoizes complex real-time statistics calculations (like WPM and accuracy tracking).
* **Windowed Text Rendering:** Ensures that long paragraphs or endless typing modes only render the visible text buffer, keeping the DOM light and responsive.

## 📂 Project Structure

```text
src/
├── 📦 app/                         # Next.js App Router (Pages and API Routes)
│   ├── 📂 api/
│   │   ├── 📂 paragraph/
│   │   │   └── 📜 route.ts         # Endpoint for fetching/sanitizing paragraphs
│   │   └── 📜 route.ts             # Core API route handler
│   ├── 📜 globals.css              # Global styles & Tailwind directives
│   ├── 📜 layout.tsx               # Root layout & global context wrappers
│   └── 📜 page.tsx                 # Main application landing page
│
├── 📦 components/                  # Modular, reusable UI components
│   ├── 📂 background/
│   │   └── 📜 Grid.tsx             # Minimalist background layout
│   ├── 📂 header/
│   │   └── 📜 Header.tsx           # Navigation and branding header
│   ├── 📂 layout/
│   │   ├── 📜 Character.tsx        # Individual character highlighting component
│   │   └── 📜 Settings.tsx         # Configurable test configurations (Time/Mode)
│   ├── 📂 main/
│   │   ├── 📜 Caret.tsx            # Custom animated cursor system
│   │   ├── 📜 Reset.tsx            # Instant test reset action handler
│   │   ├── 📜 Stats.tsx            # Live WPM, accuracy, and countdown UI
│   │   └── 📜 TypingArea.tsx       # Core interactive input arena
│   └── 📂 svg/
│       └── 📜 Tree.tsx             # Project logo / theme SVG assets
│
├── 📦 constants/                   # Fixed application configurations
│   ├── 📜 initialTypingState.ts    # Seed data for the engine state machine
│   └── 📜 paragraphs.ts            # Fallback/default text bank
│
├── 📦 hooks/                       # Isolated domain-specific business logic
│   ├── 📜 useCaretStyle.ts         # Calculates real-time custom caret coordinates
│   ├── 📜 useGetParagraph.ts       # Handles asynchronous paragraph fetching data flow
│   ├── 📜 useStats.ts              # Mathematical engine computing live WPM & Accuracy
│   ├── 📜 useTimer.ts              # Precise interval countdown machine
│   ├── 📜 useTypingEngine.ts       # Master hook unifying inputs and state triggers
│   └── 📜 useVisibleWords.ts       # Performance layer handling windowed rendering
│
├── 📦 lib/                         # Core utility & infrastructure functions
│   ├── 📜 api.ts                   # Client-side data fetching wrappers
│   └── 📜 paragraph.ts             # Server-side paragraph parsing & extraction tools
│
├── 📦 reducers/                    # Global state deterministic transitions
│   └── 📜 typingReducer.ts         # Redux-style engine dispatcher (Actions state management)
│
└── 📦 types/                       # Centralized TypeScript definitions
    ├── 📜 typeActions.type.ts      # TypeScript interfaces for useReducer events
    └── 📜 typedChar.type.ts        # Typed objects for evaluating input strings
```


 ## 🏗️ Architecture

### 1. Typing Engine (State Machine)
The core typing engine is implemented as a deterministic, reducer-based state machine. Keyboard events are intercepted and processed through a central reducer to update the state predictably, preventing race conditions or UI lag.

```typescript
// Core Engine State Shape
type TypingState = {
  currentWordIndex: number;
  currentCharacterIndex: number;
  typedCharacters: Map<string, TypedCharacter>;
  correctCharacters: number;
  incorrectCharacters: number;
  isStarted: boolean;
  isFinished: boolean;
};
```
### 2. Timer System
An isolated, dedicated timer hook manages the test lifecycle independently from the typing engine:
* **Countdown Logic:** Handles precise tick intervals.
* **State Management:** Manages internal `Start`, `Reset`, and `Test Completion` hooks.
* **Separation of Concerns:** By keeping the timer decoupled from the character validation state, high-frequency keystrokes never bottleneck the clock accuracy.

### 3. Statistics System
To prevent state synchronization bugs, statistics are dynamically derived from raw metrics rather than being stored as redundant state variables:
* **Accuracy:** Calculated as (Correct Characters / Total Typed Characters) * 100.
* **WPM:** Calculated as (Correct Characters / 5) / Elapsed Time in Minutes.

---

## ⚡ Performance Optimizations

### 🧱 Character Component Memoization
In a typical React app, typing a single letter could trigger a re-render of the entire paragraph. TreeType wraps the atom-level layout in `React.memo`:

```tsx
export const Character = React.memo(({ char, status }) => {
  return <span className={getStatusClass(status)}>{char}</span>;
});
```
Result: Only the active character and the immediate next character re-render on a keystroke. The rest of the DOM remains completely static.  

### 🪟 Windowed Paragraph Rendering
Rendering thousands of raw DOM nodes creates a heavy layout and paint cost. Instead of passing massive text payloads directly to the DOM, TreeType uses a sliding word window strategy.
```
[ Large Text Block (200+ words / 1000+ spans) ]
              ↓
    ┌───────────────────┐
    │  Sliding Window   │ -> Only few words rendered at a time
    └───────────────────┘
 ```
  - Benefits: Minimal DOM footprints, significantly reduced browser layout recalculation times, and a locked 60 FPS performance tier.

## 📍 Caret Positioning
The custom animated caret calculates its absolute layout coordinates (X, Y) by measuring the boundary box (getBoundingClientRect()) of the currently active character only, skipping expensive global layout queries.

---

## 🛠️ Challenges Solved
  
### 1. Unique Coordinate Matrix Tracking
To track mistakes reliably across dynamic changes, every single character is mapped using a unique coordinate string pattern: wordIndex-characterIndex (e.g., 12-4 targets the 5th character of the 13th word). This guarantees constant-time lookups.  
  
### 2. Index Mapping in Windowed Spaces
When slicing the paragraph array for windowed rendering, array indices shift (e.g., index 0 in the visible window is actually index 40 in the real text profile). TreeType resolves this layout drift using a relative offset calculator:  

realWordIndex = visibleWordIndex + windowStart  

This ensures the core state engine handles the data uniformly without needing to know what the user is seeing.  

## 🚀 Future Roadmap
- 📊 Analytics: User accounts, historical typing charts, and detailed analytics.

- 🏆 Social: Global leaderboards and real-time multiplayer races.

- 🎨 Customization: Multiple aesthetic themes, custom text uploads, and typing sound effects.

- ⚙️ Engine Modes: Sudden-death difficulty modes and backend-generated dynamic paragraphs.

---

## 🎓 Lessons Learned
- Developing TreeType offered deep, hands-on exposure to production-grade React behavior:

- React Render Cycles: Mastering profiling tools to identify and eliminate re-render bottlenecks.

- Advanced State Architecture: Building complex state engines using standard native hooks (useReducer).

-  Virtualization Fundamentals: Manually implementing viewport-windowing algorithms without relying on third-party libraries.

-  DOM Precision: Manipulating real-time CSS animations tied directly to layout measurements.