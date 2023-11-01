import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react"
import { ChatContext } from "../contextApi/ChatContext"
import { db } from "../firebase";
import Message from "../components/Message"


function Messages() {
  const [messages, setMessages] = useState([])
  const { data} = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
       doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unsub()
    }
  }, [data.chatId])
  return (
    <div className="messages px-3 overflow-scroll">
        {
          messages.map((m) => (
            <Message message={m} key={m.id}/>
          ))
        }
    </div>
  )
}

export default Messages


