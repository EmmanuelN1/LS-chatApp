import SidebarNav from "./SidebarNav.jsx"
import Search from "./Search.jsx"
import Chat from "./Chat.jsx"

function Sidebar() {
  return (
    <div className="sidebar">
        <SidebarNav/>
        <Search/>
        <Chat/>
    </div>
  )
}

export default Sidebar