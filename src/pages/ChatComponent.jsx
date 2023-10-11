import Sidebar from "../components/Sidebar"
import Chatboard from "../components/Chatboard"

function ChatComponent() {
  return (
    <div className="home">
        <div className="homeContainer">
            <Sidebar />
            <Chatboard/>
        </div>
    </div>
  )
}

export default ChatComponent