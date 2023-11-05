import {useState} from "react"
import { Link } from "react-router-dom"
import {getAuth, sendPasswordResetEmail} from "firebase/auth"
import {toast} from "react-toastify"


function Forgot() {

  const [ email, setEmail] = useState('')

  const onChange = e => {
      setEmail(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try{
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success("Password Reset Link Sent To Email")
    }
    catch (error) {
        toast.error('Couldnt Send Reset Email')
    }
  }

  return (
    <div className="pt-5  px-6 md:px-12 lg:px-80 justify-center pageConatiner">
        <header>
            <p className="pageHeader mb-3 font-bold text-center">
                Forgot Password
            </p>
        </header> 

        <main>
            <form onSubmit={onSubmit} >
                <input type="text" className="emailInput" placeholder="Email" id="email" value={email} onChange={onChange}/>

                <button className=" group bg-teal-700 cursor-pointer relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none mt-4">
                  Send Reset Link
                </button>
            </form>
            <Link className="forgotPasswordLink mt-4 " to="/signin">Sign In Instead</Link>
        </main>
    </div>
  )
}

export default Forgot