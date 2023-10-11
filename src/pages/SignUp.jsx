import { useState } from "react"
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import {db} from "../firebase"

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      fullname: '',
      matNo: '',
      profession: '',
      email: '',
      password:'',
  })
  
  //destructuring emanil and password from the form data
  const { email, password, profession, matNo, fullname} = formData
    const onFullNameChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        fullname: e.target.value
      }))
    }

    const onMatNoChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        matNo: e.target.value
      }))
    }

    const onProfessionChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        profession: e.target.value
      }))
    }

    const onEmailChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        email: e.target.value
      }))
    }

    const onPasswordChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        password: e.target.value
      }))
    }


    const submitForm = async (e) => {
      e.preventDefault();

      try{
          const auth = getAuth();

          console.log(email)
          console.log(password)

          const userCredential = await createUserWithEmailAndPassword(auth, email, password);

          const user = userCredential.user;


          //update username
          updateProfile(auth.currentUser, {
            displayName: fullname
          })

          //create a copy of form data
          const formDataCopy = {...formData};
          delete formDataCopy.password
          formDataCopy.timestamp = serverTimestamp();

          await setDoc(doc(db, 'users', user.uid), formDataCopy);

          await setDoc(doc(db, 'userChats', user.uid), {
            
          })
          toast.success('Successful')
          // navigate to home page
          navigate('/signin')
      } catch (error) {
        console.log(error)
          toast.error('Not Succesful')
      } 
} 
  return (
    <div className="min-h-screen h-screen items-center justify-center py-12 mx-10 lg:mx-auto max-w-md  space-y-8 ">
    {/* Header */}
        <div className="mb-10">

          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900"> 
          Sign up to create an accoount
          </h2>

          <p className="mt-2 text-center text-sm text-gray-600">
            <a href='/signin' className="font-medium text-gray-500">
            Already have an account? <span className="font-medium hover:text-black text-teal-500">Login</span>
            </a>
          </p>
        </div>

    {/* form */}
  
        <form action="" className="mt-8 space-y-6" onSubmit={submitForm} >
            <div className="-space-y-px">
             
              <input type="text" className="sr-only rounded-md appearance-none relative block w-full h-8  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-gray-200 focus:ring-0  sm:text-sm" required placeholder="FullName"  value ={fullname} onChange={onFullNameChange}/>

            </div>

            <div className="-space-y-px">
             
             <input type="text" className="sr-only rounded-md appearance-none relative block w-full h-8  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-gray-200 focus:ring-0  sm:text-sm" required placeholder="Matriculation Number / Staff's ID"  value ={matNo} onChange={onMatNoChange}/>

           </div>

            

            <div className="-space-y-px">
             
              <input type="email" className="sr-only rounded-md appearance-none relative block w-full h-8  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-gray-200 focus:ring-0  sm:text-sm" required placeholder="Email"  value ={email} onChange={onEmailChange}/>

            </div>


            <div className="-space-y-px">
             
              <input type="password" className="sr-only rounded-md appearance-none relative block w-full h-8  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-gray-200 focus:ring-0  sm:text-sm" required placeholder="Password"  value ={password} onChange={onPasswordChange}/>

            </div>

            <div className="-space-y-px">
             
             <input type="text" className="sr-only rounded-md appearance-none relative block w-full h-8  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-gray-200 focus:ring-0  sm:text-sm" required placeholder="Student or Lecturer"  value ={profession} onChange={onProfessionChange}/>

           </div>

            <input value="Sign Up" type="submit" className=" relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-700 focus:outline-none mt-10" />
        </form>
    
       
</div>
  )
}

export default SignUp