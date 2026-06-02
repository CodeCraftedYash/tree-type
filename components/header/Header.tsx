import Tree from "../svg/Tree"

const Header = () => {
  return (
    <div className="text-white h-14 flex items-center gap-4 px-4">
      <div className="w-8 bg-fuchsia-700 rounded-full p-1"><Tree /></div>
      <h1 style={{fontSize:"var(--text-size-big)"}} className="font-bold">TreeType</h1>
    </div>
  )
}

export default Header