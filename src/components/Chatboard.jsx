import { CameraIcon, PlusCircleIcon,EllipsisHorizontalIcon} from "@heroicons/react/24/outline";
import Messages from "./Messages";
import Input from "./Input"

function Chatboard() {
  return (
    <div className="chatBoard">
        <div className="chatBoardInfo bg-teal-700 ">

          <span>Jane Doe</span>

          <div className="flex space-x-2 lg:space-x-10">
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