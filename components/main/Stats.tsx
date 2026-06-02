type props = {
    timer:number;
    acc:number;
    wpm:number;
}
const Stats = ({timer,acc,wpm}:props) => {
  return (
      <div className="flex w-full items-center gap-4 ">
        <span style={{fontSize:"var(--font-size-normal)"}} className=" text-center  w-1/3 sm:w-1/6 font-bold">Time : {timer}</span>
        <span style={{fontSize:"var(--font-size-normal)"}} className=" text-center  w-1/3 sm:w-1/6 font-bold">Accuracy : {acc}</span>
        <span style={{fontSize:"var(--font-size-normal)"}} className=" text-center  w-1/3 sm:w-1/6 font-bold">WPM : {wpm}</span>
      </div>
  )
}

export default Stats