import Img from "../assets/user.JPG"

function Chat() {
  return (
    <div className="userChat space-x-2">
      <img src={Img} alt="" className="userChatImage" />

    <div className="userInfo">
      <span className="text-xs lg:text-sm font-bold ">John Doe</span>
      <p className="text-xs lg:text-sm text-gray-400">Hello</p>
    </div>
    
</div>
  )
}

export default Chat