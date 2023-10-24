import {  useState } from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from "../firebase"
import { Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify"

function SignIn() {

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
   

    const submit = async (e) => {
        e.preventDefault();
       

        try {
          const auth = getAuth();
          const idLower = id.toLowerCase()
          const q = query(collection(db, "users"), where("matNo", "==", idLower));
          const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              const em = doc.data().email
                signInWithEmailAndPassword(auth, em, password).then((data) => {
                  if (data.user) {
                    toast.success("You are logged in")
                    navigate('/')
                  }
                });  
             
              
            }) 
          
        } catch(error) {
              toast.error('Sign In Failed')
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
                    <Link to='/signup' className="font-medium text-gray-500">
                      Dont have an account yet? <span className="font-medium hover:text-black text-teal-500">Sign up</span>
                    </Link>
                  </p>
                </div>

            {/* form */}
          
                <form action="" className="mt-8 px-4 lg:px-0 space-y-6" onSubmit={submit}>
                    <div className="-space-y-px">
                     
                      <input type="text" className="sr-only rounded-md appearance-none relative block w-full h-8  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-gray-200 focus:ring-0  sm:text-sm" required placeholder="Staff ID / Matriculation Number"  value ={id} onChange={(e) => setId(e.target.value) }/>
                    </div>


                    <div className="-space-y-px">
                     
                     <input type="password" className="sr-only rounded-md appearance-none relative block w-full h-8  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-gray-200 focus:ring-0  sm:text-sm" required placeholder="Password"  value ={password} onChange={(e) => setPassword(e.target.value) }/>
                   </div>

                    <input value="Sign In" onSubmit={submit} type="submit" className="group cursor-pointer relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-700 focus:outline-none mt-10" />
                </form>
               
    </div>
  )
}

export default SignIn