import { useContext, useEffect, useRef } from "react"
import avatar from "../assets/user.png"
import { ChatContext } from "../contextApi/ChatContext"
import { AuthContext } from "../contextApi/AuthContext"


function Message({message}) {

const {currentUser} = useContext(AuthContext)
const {data} = useContext(ChatContext)

const ref = useRef()


useEffect(() => {
  ref.current?.scrollIntoView({behavior: 'smooth'})
}, [message])

  return (
    <div ref={ref} className={`message space-x-5 ${message.senderId === currentUser.uid && 'ownerMessage'}`}>
        <div className="messageInfo">
            <img src={avatar} alt="" width={20} height={20} className="rounded-full"/>
            <span className="text-xs">just now</span>
        </div>

        <div className="messageContent ownerMessageContent space-y-3">
              <p className={`messsageText ${message.senderId === currentUser.uid && 'ownerText'}  text-sm lg:text-base`}>{message.text}</p>
            
        </div>
    </div>
  )
}

export default Message