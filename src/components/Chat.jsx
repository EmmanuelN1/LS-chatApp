import { useContext, useEffect, useState } from "react"
import Img from "../assets/user.png"
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../contextApi/AuthContext";
import { ChatContext } from "../contextApi/ChatContext";

function Chat() {

  const [chats, setChats] = useState([])
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  useEffect(() => {
      const getChats = () => {
          const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
            setChats(doc.data())
          });
      
          return () => {
            unsub();
          }
      }

    currentUser.uid && getChats()
  }, [currentUser.uid])

 const handleSelect = (u) => {
    dispatch({
      type: "CHANGE_USER",
      payload: u
    })
 }

  return (

    <>
        {  Object.entries(chats)?.sort((a,b)=> b[1].date - a[1].date).map((chat) => (
          <div className="userChat space-x-2" key ={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
              <img src={Img} alt="" className="userChatImage" />
              <div className="userInfo">
                <span className="text-xs lg:text-sm font-bold ">{chat[1].userInfo?.fullname}</span>
                <p className="text-xs lg:text-sm text-gray-400">{chat[1].lastMessage?.text}</p>
              </div>
          </div>
        ))  
           }
      </>
      
    
  )
}

export default Chat