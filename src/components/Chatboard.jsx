import { useContext } from "react";
import { CameraIcon, PlusCircleIcon,EllipsisHorizontalIcon} from "@heroicons/react/24/outline";
import Messages from "./Messages";
import Input from "./Input"
import { ChatContext } from "../contextApi/ChatContext";

function Chatboard() {
  const {data} = useContext(ChatContext)

  return (
    
    <div className="chatBoard">
        <div className="chatBoardInfo bg-teal-700 ">
            <div className="space-x-1 justify-center">
                <span className="text-sm lg:text-base uppercase font-bold">{data.user?.fullname}</span>
                <span className="text-sm lg:text-sm text-gray-400 font-bold">({data.user?.profession})</span>
            </div>
          

          <div className=" hidden lg:flex lg:space-x-4">
              <CameraIcon className="h-6 w-6 cursor-pointer"/>
              <PlusCircleIcon className="h-6 w-6 cursor-pointer"/>
              <EllipsisHorizontalIcon className="h-6 w-6 cursor-pointer"/>
          </div>  

        </div>

        <Messages/>
        <Input/>

    </div>
  )
}

export default Chatboard