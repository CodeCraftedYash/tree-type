import { HistoryPoint } from "@/types/historyPoints.type";
import LineChart from "./LineChart";
import { BsStars } from "react-icons/bs";
import { HiOutlineLightBulb } from "react-icons/hi";
import { GrLinkNext, GrPowerReset } from "react-icons/gr";
type Props = {
  history: HistoryPoint[];
  correctCharacters: number;
  incorrectCharacters: number;
  timeLimit: number;
  reset: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  next: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
type statsCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  clr: string;
  desc: string;
};
const Result = ({
  history,
  correctCharacters,
  incorrectCharacters,
  timeLimit,
  reset,
  next,
}: Props) => {
  const handleTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    if (video.paused) return;
    if (video.currentTime > 0) {
      video.muted = false;
      video.volume = 0.2;
    }
    if (video.currentTime > video.duration - 2) {
      video.currentTime = 0;
    }
  };

  const handleVideoClick = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    if (video.paused) video.play();
    else video.pause();
  };
  const acc = Math.floor(
    correctCharacters + incorrectCharacters === 0
      ? 100
      : (correctCharacters / (correctCharacters + incorrectCharacters)) * 100,
  );
  const wpm = Math.floor(correctCharacters / 5 / (timeLimit / 60));
  const rawWpm = Math.floor(
    (correctCharacters + incorrectCharacters) / 5 / (timeLimit / 60),
  );

  const statsData = [
    {
      title: "WPM",
      value: wpm,
      icon: <span />,
      clr: "#713BCD",
      desc: "Words per minute",
    },
    {
      title: "Accuracy",
      value: acc,
      icon: <span />,
      clr: "#3791F2",
      desc: "Correct Characters",
    },
    {
      title: "Time",
      value: timeLimit,
      icon: <span />,
      clr: "#30994C",
      desc: "Total time",
    },
    {
      title: "Characters",
      value: `${correctCharacters} / ${incorrectCharacters} / ${correctCharacters + incorrectCharacters}`,
      icon: <span />,
      clr: "#F8BF21",
      desc: "correct / incorrect / total",
    },
    {
      title: "Raw",
      value: rawWpm,
      icon: <span />,
      clr: "#713BCD",
      desc: "Raw WPM",
    },
  ];

  const StatsCard = ({ title, value, icon, clr, desc }: statsCardProps) => (
    <div className="p-2 flex flex-col gap-2 bg-[#161A24] rounded-2xl border border-white/5">
      <h2 style={{ color: clr }} className="text-sm font-bold">
        {title}
      </h2>
      <div className="flex w-full justify-between ">
        <h2 className="text-white text-xl">{value}</h2>{" "}
        <span className="text-white ">{icon}</span>
      </div>
      <h3 className="text-white/80 text-sm font-thin">{desc}</h3>
    </div>
  );

  return (
    <div className="w-[95%] h-full left-1/2 top-1/2 -translate-1/2  absolute flex flex-col justify-start items-center z-50 bg-[#10131A] rounded-3xl overflow-hidden">
      <div className="absolute top-4 right-15 flex gap-10">
        <button
          className="hover:cursor-pointer border p-2 rounded-xl hover:scale-110 transition-all duration-100 ease-in-out px-4 hover:text-(--accent)"
          onClick={reset}
        >
          <GrPowerReset />
        </button>
        <button
          className="hover:cursor-pointer border p-2 rounded-xl hover:scale-110 transition-all duration-100 ease-in-out px-4 hover:text-(--accent)"
          onClick={next}
        >
          <GrLinkNext />
        </button>
      </div>
      <div className="w-full h flex flex-col p-4 gap-1">
        <h1 className="text-xl font-bold">Test Result</h1>
        <h2 className="text-sm text-white/80 whitespace-nowrap flex items-center gap-1">
          Great job! You completed the test.{" "}
          <span className="text-lg" style={{ color: statsData[0].clr }}>
            <BsStars className="rotate-270" />
          </span>
        </h2>
      </div>
      <div className="flex w-full px-4 gap-5 justify-between items-center">
        {statsData.map((item, index) => (
          <div className="w-1/5 shadow" key={index}>
            <StatsCard
              clr={item.clr}
              desc={item.desc}
              icon={item.icon}
              title={item.title}
              value={item.value}
            />
          </div>
        ))}
      </div>
      <div className="flex  w-full h-fit items-start p-4 gap-5">
        <video
          src="https://res.cloudinary.com/dkoyvtbeq/video/upload/v1782285484/WhatsApp_Video_2026-06-23_at_5.47.08_PM_mowb9n.mp4"
          className="h-101.5 rounded-xl"
          autoPlay
          muted
          onTimeUpdate={handleTimeUpdate}
          onClick={handleVideoClick}
        ></video>
        <div className="grow h-full rounded-xl flex flex-col gap-2">
          <LineChart history={history} />
          <div className="bg-[#181C26] p-2 rounded-xl">
            <h2 className="flex gap-1">
              <span
                className="flex items-center gap-0.5"
                style={{ color: statsData[0].clr }}
              >
                <HiOutlineLightBulb className="text-xl" />
                Tip:
              </span>{" "}
              Consistent practice is the key to improving your typing speed and
              accuracy!
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
