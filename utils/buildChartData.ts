import type { HistoryPoint } from "@/types/historyPoints.type";

export function buildChartData(history: HistoryPoint[]) {
  return history.map((p) => ({
    second: p.second,

    wpm:Math.floor(
      p.second === 0
        ? 0
        : (p.correctCharacters / 5) / (p.second / 60)),

    accuracy:Math.floor(
      p.correctCharacters + p.incorrectCharacters === 0
        ? 100
        : (p.correctCharacters /
            (p.correctCharacters + p.incorrectCharacters)) *
          100),

    incorrectCharacters: p.incorrectCharacters,
  }));
}