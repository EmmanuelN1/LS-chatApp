import { PhotoIcon, PaperClipIcon, PaperAirplaneIcon} from "@heroicons/react/24/outline";


function Input() {
  return (
        <div className="input">
            <input type="text" placeholder="Type A Message..." class="inputText text-xs lg:text-sm"/>
            <div className="inputSend space-x-3">
            <PaperClipIcon height={24} width={24}/>
                <input type="file" style={{display:"none"}} id="inputFile"/>
                <label htmlFor="file">
                    <PhotoIcon height={24} width={24}/>
                </label>

                <PaperAirplaneIcon height={24} width={24}/>

            </div>
        </div>
  )
}

export default Input