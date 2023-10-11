import { useState } from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate} from "react-router-dom";
import {toast} from "react-toastify"

function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
  
    const submit = async (e) => {
        e.preventDefault();

        try {
          const auth = getAuth();
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          if (userCredential.user) {
            toast.success("You are logged in")
            navigate('/')
          }
  
        } catch(error) {
              toast.error('Bad User Credentials')
        }
  
    }

  return (
 <div className="min-h-screen h-screen items-center justify-center py-12  mx-auto max-w-md  space-y-8">
            {/* Header */}
                <div className="mb-10">

                  <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900"> 
                  Welcome Back!!!
                  </h2>

                  <p className="mt-2 text-center text-sm text-gray-600">
                    <a href='/signup' className="font-medium text-gray-500">
                      Dont have an account yet? <span className="font-medium hover:text-black text-teal-500">Sign up</span>
                    </a>
                  </p>
                </div>

            {/* form */}
          
                <form action="" className="mt-8 space-y-6" onSubmit={submit}>
                    <div className="-space-y-px">
                     
                      <input type="text" className="sr-only rounded-md appearance-none relative block w-full h-8  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-gray-200 focus:ring-0  sm:text-sm" required placeholder="Email / Matriculation Number"  value ={email} onChange={(e) => setEmail(e.target.value) }/>
                    </div>


                    <div className="-space-y-px">
                     
                     <input type="password" className="sr-only rounded-md appearance-none relative block w-full h-8  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-gray-200 focus:ring-0  sm:text-sm" required placeholder="Password"  value ={password} onChange={(e) => setPassword(e.target.value) }/>
                   </div>

                    <input value="Sign In" onSubmit={submit} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-700 focus:outline-none mt-10" />
                </form>
               
    </div>
  )
}

export default SignIn