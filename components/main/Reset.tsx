
const Reset = ({reset}:{reset:(e:React.MouseEvent<HTMLButtonElement>)=>void}) => {
  return (
    <button onClick={reset} className="hover:cursor-pointer border p-2 rounded-xl hover:scale-110 transition-all duration-100 ease-in-out">reset</button>
  )
}

export default Reset