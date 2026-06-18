import clsx from "clsx";
import { MdOutlineSettings } from "react-icons/md"

type props = {
    timeLimit:number;
    isRunning: boolean;
    handleTimeLimitChange: (timeLimit:number) => void;
}
export default function Settings ({timeLimit,isRunning,handleTimeLimitChange}:props) {
    const timers = [15,30,45,60];
    return(
        <div className="flex flex-nowrap items-center gap-5">
            <MdOutlineSettings />
            <ul className="flex gap-5">
                {timers.map((item,index)=>{
                    return(<li key={index} className={clsx("px-1",timeLimit===item ?"text-(--accent) font-bold ":"hover:cursor-pointer hover:scale-110 hover:text-(--accent-light)")} onClick={()=>{if(!isRunning)handleTimeLimitChange(item)}}>{item}s</li>)
                })}
            </ul>
        </div>
    )
}