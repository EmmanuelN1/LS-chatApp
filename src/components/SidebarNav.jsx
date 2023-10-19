import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contextApi/AuthContext";
import { useContext } from "react";

function SidebarNav() {

  const auth = getAuth();
  const navigate = useNavigate();

  const logOut = () => {
    auth.signOut();
    navigate('/')
  }

  const {currentUser} = useContext(AuthContext)


  return (
    <div className='sideBarNav bg-teal-700'>
      

        <div className="sideBarNavName  uppercase font-bold  ">
         <span className="text-white">{currentUser.displayName}</span>

        </div>


        <div className="sideBarRight ">
            <button className="hidden lg:inline bg-white rounded-md text-teal-700 text-xs lg:text-sm text-extrabold px-3 py-1 cursor-pointer " onClick={logOut}>Logout</button>
        </div>
    </div>
  )
}

export default SidebarNav