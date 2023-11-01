import { useContext, useEffect, useRef } from "react"
import { AuthContext } from "../contextApi/AuthContext"
import { ChatContext } from "../contextApi/ChatContext"
import avatar from "../assets/user.png"
import { DocumentIcon} from "@heroicons/react/24/outline";


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
              {message.text && <p className={`messsageText ${message.senderId === currentUser.uid && 'ownerText'}  text-sm lg:text-base`}>
                
                {message.text}</p> }
              {message.imageUrl &&  <a href={message.imageUrl} target="_blank">
                <DocumentIcon height={24} width={24} fill="#ffffff"/>
              </a>}
             
        </div>
    </div>
  )
}

export default Message