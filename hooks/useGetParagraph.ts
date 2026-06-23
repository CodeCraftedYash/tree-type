import { useEffect, useState } from "react";

export default function useGetParagraph() {
    const [para,setPara] = useState("");
    useEffect(() => {
      async function loadParagraph() {
        const res = await fetch("/api/paragraph");
        const data = await res.json();
    
        setPara(data.text);
      }
    
      loadParagraph();
    }, []);
    return para;
}