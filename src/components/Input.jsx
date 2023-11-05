import { useContext, useState } from "react";
import { AuthContext } from "../contextApi/AuthContext";
import { ChatContext } from "../contextApi/ChatContext";
import {PaperAirplaneIcon} from "@heroicons/react/24/outline";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db} from "../firebase";
import {v4 as uuid} from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getStorage } from "firebase/storage";
import { DocumentIcon} from "@heroicons/react/24/outline";

function Input() {

    const [text, setText] = useState("")
    const [image, setImage] = useState(null)
    
    
    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)

    
   
    const send = async () => {
      if (text === "" && image === null){
          alert("Fields can't be empty ")
      } else {
          if (image) {
          const storeImage = async (img) => {
            return new Promise((resolve, reject) => {
              const storage = getStorage()
              const fileName = uuid()
      
              const storageRef = ref(storage, 'images/' + fileName)
      
              const uploadTask = uploadBytesResumable(storageRef, img)
      
              uploadTask.on(
                'state_changed',
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  console.log('Upload is ' + progress + '% done')
                  switch (snapshot.state) {
                    case 'paused':
                      console.log('Upload is paused')
                      break
                    case 'running':
                      console.log('Upload is running')
                      break
                    default:
                      break
                  }
                },
                (error) => {
                  reject(error)
                },
                () => {
                  // Handle successful uploads on complete
                  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL)
                  })
                }
              )
            })
          }

          await Promise.all([image].map((img) => storeImage(img))).then((url) => {
          
            updateDoc(doc(db, 'chats', data.chatId), {
              messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  imageUrl : url

              })
          })
          })
                setImage(null)
                setText("")

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
    }

  return (
        <div className="input  ">
            <input type="text" placeholder="Type A Message..." className="inputText text-xs lg:text-sm" onChange={(e) => setText(e.target.value)} value={text}/>

            <div className="inputSend space-x-3">
                 <input
                    type='file'
                    id='image'
                    onChange={e => setImage(e.target.files[0])}
                    max='1'
                    accept='.jpg,.png,.jpeg,.pdf,.docx'
                    style={{display: "none"}}
                    required
                 />
                 <label htmlFor="image">
                    <DocumentIcon fill="#008080" height={24} width={24}/>
                 </label>
                <PaperAirplaneIcon onClick={send} fill="#008080" height={24} width={24}/>
            </div>

            
        </div>
  )
}

export default Input