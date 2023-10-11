import { useState } from "react"
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../firebase"

function Search() {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)


  const searchUser = async () => {
      const q = query(collection(db, "users"), where("displayName", "==", username));

      try{
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data())
         })
    } catch (err) {
        setErr(true)
    }
  }

  const handleKey = (e) => {
      e.code === "Enter" && searchUser()
      console.log(user)
  }
  return (
    <div className="search"> 
        <div className="searchForm">
            <input type="text" name="" id="" placeholder="Search For A User" className="text-xs " onKeyDown={handleKey} onChange={(e) => setUser(e.target.value)}/>
        </div>
        {err && <span>User not found</span>}
        {  user &&
              <div className="userChat space-x-2">
                  <div className="userInfo">
                      <span className="text-xs lg:text-sm font-bold ">{user.displayName}</span>
                    <p className="text-xs lg:text-sm text-gray-400">Hello</p>
                  </div>
              </div>
      }
    </div>
  )
}

export default Search