import { useState, useEffect} from "react"
import {toast} from "react-toastify"
import {Link, useNavigate} from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import {db} from "../firebase"
import { PhotoIcon} from "@heroicons/react/24/outline";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"



function SignUp() {
    const navigate = useNavigate();

   
    const [formData, setFormData] = useState({
      fullname: '',
      matNo: '',
      profession: '',
      email: '',
      password:'',
      // avatarUrl: '',
      uid: ""
    
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

    // const onAvatarChange = (e) => {
    //   setFormData((prevState) => ({
    //     ...prevState,
    //     avatarUrl: e.target.files[0]
    //   }))
    // }


    const submitForm = async (e) => {
      e.preventDefault();

      try{
          const auth = getAuth();

          const res = await createUserWithEmailAndPassword(auth, email, password);
          //Uploading the avatarUrl
          // const storageRef = ref(storage, fullname)
          // const uploadTask = uploadBytesResumable(storageRef, formData.avatarUrl)

          //register three observer
        //  uploadTask.on (
        //     (error) => {
        //       toast.error('Image Upload failed')
        //     },

        //   async  ()  => { 
        //       getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
        //                 // setDurl(downloadURL);
                        
        //               await updateProfile(res.user, {
        //                 display:fullname,
        //                 // photoURL: dURL
        //               })

                     
        //         }
                
                
                
        //         )
        //     }
        //   )
          
       //creating an instance of the formData
       const formDataCopy = {...formData};
       const fname = formDataCopy.fullname
       const fnameLower = fname.toLowerCase()
       formDataCopy.fullname = fnameLower
       delete formDataCopy.password
       delete formDataCopy.avatarUrl
       formDataCopy.uid = res.user.uid
       formDataCopy.timestamp = serverTimestamp();

       await updateProfile(res.user, {
        displayName:fullname,            
      })

       await setDoc(doc(db, 'users', res.user.uid), formDataCopy);
       
       await setDoc(doc(db, 'userChats', res.user.uid), {
         
       })
       toast.success('Successful')
       // navigate to home page
       navigate('/signin')

      } catch (error) {
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
            <Link to='/signin' className="font-medium text-gray-500">
            Already have an account? <span className="font-medium hover:text-black text-teal-500">Login</span>
            </Link>
          </p>
        </div>

    {/* form */}
  
        <form action="" className="mt-8 c space-y-6" onSubmit={submitForm} >
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

           {/* <div className="-space-y-px">
             <input type="file" className="" id="imgUpload" onChange={onAvatarChange} style={{display:"none"}} />
             <label htmlFor="imgUpload" className=" flex items-center space-x-3 "  >
                  <PhotoIcon height={24} width={24} />
                  <span className="text-gray-400">Add Profile Picture</span>
             </label>
           </div> */}

            <input value="Sign Up" type="submit" className="cursor-pointer relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-700 focus:outline-none mt-10" />
        </form>
    
       
</div>
  )
}

export default SignUp