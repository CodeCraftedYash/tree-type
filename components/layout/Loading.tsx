import { useEffect, useState } from "react";
import { GiFlowerTwirl } from "react-icons/gi"


const COLORS = ["#713BCD","#3791F2","#30994C","#E2B714"];

const Loading = () => {
    const [index,setIndex] = useState(0);
    useEffect(()=>{
        const interval = setInterval(()=>{
            setIndex(prev=>(prev+1)%COLORS.length);
        },500);
        return (() => clearInterval(interval));
    },[])
  return (
    <div className="absolute z-50 transition-all duration-400 ease-in-out top-1/2 left-1/2 -translate-1/2 text-5xl" style={{color:COLORS[index]}}><div className="animate-spin w-fit h-fit"><GiFlowerTwirl/></div></div>
  )
}

export default Loading