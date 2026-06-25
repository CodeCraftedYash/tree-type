import { HistoryPoint } from "@/types/historyPoints.type";
import { buildChartData } from "@/utils/buildChartData";
import {
  LineChart as LChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

type Props = {
  history: HistoryPoint[];
};

export default function LineChart({ history }: Props) {
  const charData = buildChartData(history);

  return (
    <div className=" h-1/2">
      <LChart
        style={{ width: "100%", height: "100%", aspectRatio: 1.618 }}
        responsive
        data={charData}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.202)" />
        <XAxis dataKey="second" stroke="rgba(255, 255, 255, 0.802)" />
        <YAxis width="auto" stroke="rgba(255, 255, 255, 0.802)" tick={{ fill: '#713BCD' }} />
        <Tooltip
          cursor={{
            stroke: "rgba(255,255,255,0.3)",
          }}
          contentStyle={{
            backgroundColor: "rgba(20,20,20,1)",
            borderColor: "white",
            color: "white",
          }}
          labelFormatter={(value)=>value+"s"}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="wpm"
          stroke="#713BCD"
          dot={{
            fill: "white",
          }}
          activeDot={{ r: 4, stroke: "black" }}
        />
        <Line
          type="monotone"
          dataKey="accuracy"
          stroke="#3791F2"
          dot={{
            fill: "black",
          }}
          activeDot={{ stroke: "black" }}
        />
      </LChart>
    </div>
  );
}
