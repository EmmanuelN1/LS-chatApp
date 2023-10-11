import { useState } from "react";

function Support() {
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

const sendMail = () => {
    window.open(
        `mailto:info@spyrth.com?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(fname)} (${encodeURIComponent(
          email
        )}): ${encodeURIComponent(message)}`
      );
}
  return (
    <div className=" pt-5 px-6 md:px-12 lg:px-28 xl:px-28 justify-center ">
    <h2 className="text-2xl font-bold text-teal-800 mb-1 md:mb-1 lg:mb-1 xl:mb-1 text-center ">CONTACT US </h2>
 
    <div className="mt-5 ">
      <form action="" method="POST" onSubmit={sendMail} >
        <div className="w-full md:flex lg:flex xl:flex mt-2 mb-5">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase text-xs  font-bold mb-2 tracking-wider">First Name</label>
                        <input type="text" name="fname" id="" required placeholder=" Enter Your First Name" className="block bg-gray-100 py-3 px-4 w-full border border-gray-400 text-black rounded-md focus:outline-none "  value={fname} onChange={(e) => setFname(e.target.value)} />
                  </div>
                
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase text-xs text-gray-700 font-bold mb-2 tracking-wider">Last Name</label>
                        <input type="text" name="lname" id="" required placeholder=" Enter Your Last Name" className="block bg-gray-100 py-3 px-4 w-full border border-gray-400 text-black rounded-md focus:outline-none "  />
                  </div>
          </div>

          <div className="w-full md:flex lg:flex xl:flex mt-2 mb-5">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase text-xs text-gray-700 font-bold mb-2 tracking-wider">Subject</label>
                            <input type="text" name="subject" id="" required placeholder="Subject" className="block bg-gray-100 py-3 px-4 w-full border border-gray-400 text-black rounded-md focus:outline-none "  value={subject} onChange={(e) => setSubject(e.target.value)}  />
                      </div>
                    
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase text-xs font-bold mb-2 tracking-wider">Email</label>
                            <input type="email" name="email" id="" required placeholder="example@example.com" className="block bg-gray-100 py-3 px-4 w-full border border-gray-400 text-black rounded-md focus:outline-none "  value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
          </div>  


          <div className="flex mb-6 ">

              <div className="w-full px-3">
                  <label htmlFor="" className="block uppercase text-xs  font-bold mb-2 tracking-wider">
                  Message
                  </label>

                  <textarea className="no-resize bg-gray-100 h-48 resize-none appearance-none w-full rounded-md py-3 px-4 focus:outline-none border border-gray-400 " placeholder="Enter Your Message here" id="" name="message"  required value={message} onChange={(e) => setMessage(e.target.value)}>

                  </textarea>
          
              </div>

          </div>


          <div className="md:flex md:items-center lg:flex lg:float-right xl:flex xl:float-right">
              <div className="md:w-1/3">
                  <button className="shadow bg-teal-800 text-white  py-2 px-4 mx-2 rounded-md">
                      Submit
                  </button>
              </div>
          </div>

          <div>
          
          </div>   

                
            </form>

    </div>

</div>
  )
}

export default Support
