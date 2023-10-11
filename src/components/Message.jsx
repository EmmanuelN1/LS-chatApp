import avatar from "../assets/user.JPG"
function Message() {
  return (
    <div className="message ownerMessage space-x-5">
        <div className="messageInfo">
            <img src={avatar} alt="" width={20} height={20} className="rounded-full"/>
            <span className="text-xs">just now</span>
        </div>

        <div className="messageContent ownerMessageContent space-y-3">
              <p className="messsageText ownerText text-sm lg:text-base">hello</p>
              <img src={avatar} className="messageImage" alt="messageImage" />
        </div>
    </div>
  )
}

export default Message