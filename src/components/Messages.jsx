import { useContext, useEffect, useState } from "react"
import Message from "../components/Message"
import { ChatContext } from "../contextApi/ChatContext"
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

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


