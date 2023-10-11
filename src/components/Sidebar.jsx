import SidebarNav from "./SidebarNav.jsx"
import Search from "./Search.jsx"
import Chats from "./Chats.jsx"

function Sidebar() {
  return (
    <div className="sidebar">
        <SidebarNav/>
        <Search/>
        <Chats/>
    </div>
  )
}

export default Sidebar