import { useContext, useEffect, useState } from "react"
import {collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where} from "firebase/firestore";
import {db} from "../firebase"
import Img from "../assets/user.png"
import {MagnifyingGlassIcon}  from  "@heroicons/react/24/outline"
import {AuthContext} from "../contextApi/AuthContext"
import { ChatContext } from "../contextApi/ChatContext";



function Search() {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)
  const [curr, setCurr] = useState({})
 

const {currentUser} = useContext(AuthContext)
const {data, dispatch} = useContext(ChatContext)


  const searchUser = async () => {

    let uLower = username.toLowerCase()
      const q = query(collection(db, "users"), where("fullname", "==", uLower))
    
      try{
          const querySnapshot =  await getDocs(q)
            querySnapshot.forEach((doc) => {
              setUser(doc.data())
              dispatch({
              type: "CHANGE_USER",
              payload: doc.data()
               })
           }) 
           
           console.log(user)
     
    } catch (err) {
      setError(true)
       
    }
    

}

  const handleClick = () => {
    if  (username === "") {
      alert('Username empty')
    } else{
      searchUser()
      
    }
  }

  
  const handleSelect = async () => {
  
  //check whether the chats exist or not, if not create new one

  const  combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid

  console.log(data)


   
  try {
    const resRef = doc(db, "chats", combinedId);
    const resSnap = await getDoc(resRef);

 
    if (!resSnap.exists()){
      //create chats in chats collection
      await  setDoc(doc(db, "chats", combinedId), {messages: []})
      
  
      //create user chat
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId + ".userInfo"] : {
            uid: data.user.uid,
            fullname: data.user.fullname,
            profession: data.user.profession
            
        }, 
        
        [combinedId + ".date"] : serverTimestamp()
      })
  
      await  Promise.all(updateDoc(doc(db, "userChats", user.uid), {
        [combinedId + ".userInfo"] : {
            uid: currentUser.uid,
            fullname: currentUser.fullname,
            profession: currentUser.profession
        }, 
        
        [combinedId + ".date"] : serverTimestamp()
      }))
    } 

  }
  catch (err) {
  
  }

  setUser(null)
  setUsername("")
  
  }

  useEffect(() => {

    // let com = data?.user.uid + currentUser.uid
    // console.log(com)

    // updateDoc(doc(db, "userChats", data.user.uid), {
    //   [com + ".userInfo"] : {
    //       uid: currentUser.uid,
    //       fullname: currentUser.fullname,
    //       profession: currentUser.profession
    //   }, 

    // })
  }, [dispatch])

  return (
    <div className="search"> 
        <div className="searchForm flex">
            <input type="text" name="" id="" placeholder="Search User" className="text-xs flex-1 " onChange={(e) => setUsername(e.target.value)} value={username}/>
            <MagnifyingGlassIcon className="cursor-pointer" width='20px' height="20px" onClick={handleClick}/>
        </div>

        {error && <span>No User Found</span>}
        
        {  user &&
          <div className="userChat space-x-2" onClick={handleSelect}>
               <img src={Img} alt="" className="userChatImage"  />
         
             <div className="userInfo">
               <span className="text-xs lg:text-sm font-bold ">{user.fullname}</span>
             </div>
             
         </div>
      }
    </div>
  )
}

export default Search