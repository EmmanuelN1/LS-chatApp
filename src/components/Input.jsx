import { PhotoIcon, PaperAirplaneIcon} from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { AuthContext } from "../contextApi/AuthContext";
import { ChatContext } from "../contextApi/ChatContext";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import {v4 as uuid} from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { db, storage} from "../firebase";



function Input() {

    const [text, setText] = useState("")
    const [image, setImage] = useState(null)
    
    
    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)

    const send = async () => {
        if (image) {
           const storageRef = ref(storage, uuid())
           const uploadTask = uploadBytesResumable(storageRef, image)

           //register three observer
         uploadTask.on (
            (error) => {
              toast.error('Image Upload failed')
            },

          async  ()  => { 
              getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                await updateDoc(doc(db, 'chats', data.chatId), {
                    messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: currentUser.uid,
                        date: Timestamp.now(),
                        image: downloadURL
                    })
                })
                })
            }
          )

        } else{
            await updateDoc(doc(db, 'chats', data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now()
                })
            })
        }

        await updateDoc(doc(db,"userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]:{
                text,
            },

            [data.chatId + ".date"] : serverTimestamp()
        })

        await updateDoc(doc(db,"userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]:{
                text,   
            },

            [data.chatId + ".date"] : serverTimestamp()
        })
        setImage(null)
        setText("")
    }

  return (
        <div className="input">
            <input type="text" placeholder="Type A Message..." class="inputText text-xs lg:text-sm" onChange={(e) => setText((e).target.value)} value={text}/>
            <div className="inputSend space-x-3">
                <input type="file" style={{display:"none"}} id="file" onChange={e => setImage(e.target.files[0])}/>
                <label htmlFor="file">
                    <PhotoIcon height={24} width={24}/>
                </label>

                <PaperAirplaneIcon onClick={send} fill="#008080" height={24} width={24}/>

            </div>
        </div>
  )
}

export default Input