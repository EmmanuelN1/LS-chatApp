import { useContext, useEffect, useState } from "react"
import {collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc,onSnapshot, where} from "firebase/firestore";
import {db} from "../firebase"
import {AuthContext} from "../contextApi/AuthContext"
import Img from "../assets/user.png"
import {MagnifyingGlassIcon}  from  "@heroicons/react/24/outline"



function Search() {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)


const {currentUser} = useContext(AuthContext)

useEffect(() => {

}, [user])

  const searchUser = async () => {
    
    //   const q = query(collection(db, "users"), where("fullname", "==", username))

    //   try{
    //       const querySnapshot =  await getDocs(q)
    //         querySnapshot.forEach((doc) => {
    //             setUser(doc.data())
    //        })
           
     
    // } catch (err) {
    //   setError(true)
       
    // }
    
    try {
        let uLower = username.toLowerCase()
        const q = query(collection(db, "users"), where("fullname", "==", uLower));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const u = [];
          querySnapshot.forEach((doc) => {
          u.push(doc.data());
          setUser(u[0])
        });
      
        });
      } catch(err){
        setError(true)
      }
      
}



  const handleClick = (e) => {
    if  (username == "") {
      alert('Username empty')
    }
      searchUser()
  }
  
  const handleSelect = async (u) => {
  
  //check whether the chats exist or not, if not create new one
  const  combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
   
  try {
    const resRef = doc(db, "chats", combinedId);
    const resSnap = await getDoc(resRef);


 
    if (!resSnap.exists()){
      //create chats in chats collection
      await  setDoc(doc(db, "chats", combinedId), {messages: []})
      
  
      //create user chat
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId + ".userInfo"] : {
            uid: user.uid,
            fullname: user.fullname,
            profession: user.profession
            
        }, 
        
        [combinedId + ".date"] : serverTimestamp()
      })
  
      await updateDoc(doc(db, "userChats", user.uid), {
        [combinedId + ".userInfo"] : {
            uid: currentUser.uid,
            fullname: currentUser.fullname,
            profession: user.profession
        }, 
        
        [combinedId + ".date"] : serverTimestamp()
      })
    } 

  }
  catch (err) {
  
  }

  setUser(null)
  setUsername("")
  
  }

  return (
    <div className="search"> 
        <div className="searchForm flex">
            <input type="text" name="" id="" placeholder="Search User" className="text-xs flex-1 " onChange={(e) => setUsername(e.target.value)} value={username}/>
            <MagnifyingGlassIcon width='15px' height="15px" onClick={handleClick}/>
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