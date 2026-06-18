type props = {
    caretStyle: {
        left:number;
        top:number;
        height:number;
    }
}

const Caret = ({caretStyle}:props) => {
  return (
     <div
          className="absolute w-[1.5px] scale-y-90 bg-(--accent) animate-pulse transition-all duration-100"
          style={{
            left: `${caretStyle.left}px`,
            top: `${caretStyle.top}px`,
            height: `${caretStyle.height}px`,
          }}
        />
  )
}

export default Caret