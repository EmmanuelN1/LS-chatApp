import { getAuth, updateProfile } from "firebase/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";
import {db} from "../firebase";
import { toast } from "react-toastify";

function Profile() {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);


  const [formData, setFormData] = useState({
      name: auth.currentUser.displayName,
      email: auth.currentUser.email
  })

  const {name, email} = formData;

  const navigate = useNavigate();

  const onLogOut = () => {
      auth.signOut();
      navigate('/')
  }

  const onSubmit = async () => {
        try {
            if (auth.currentUser.displayName !== name && auth.currentUser.email !== email) {
                //update displayName in firebase
                await updateProfile(auth.currentUser, {
                    displayName: name,
                 
                })

                //update in firestore
                const userRef = doc(db, 'users', auth.currentUser.uid)
                await updateDoc(userRef, {
                    name: name,
                })
            }
        } catch (error) {
            toast.error('Could not update credentials')
        }
  }

  const changePersonalDetails = () => {
    changeDetails && onSubmit()
    setChangeDetails((prevState) => !prevState);
  }



  const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id] : e.target.value
        }))
  }

  return <div className="profile mx-auto">
              <header className="profileHeader">
                  <p className="pageHeader">
                        My Profile
                  </p>
                  <button type="button" className="logOut" onClick={onLogOut}> Logout</button>
              </header>

              <main>
                 <div className="profileDetailsHeader">
                        <p className="profileDetailsText">
                            Personal Details
                        </p>

                        <p className="changePersonalDetails" onClick={changePersonalDetails}
                        >
                            { changeDetails ? 'done' : 'change'}
                        </p>
                 </div>

                 <div className="profileCard">
                    <form >
                        <input type="text" id="name" className={!changeDetails ? 'profileName' : 'profileNameActive'} disabled={!changeDetails} value={name} onChange={onChange} />

                        <input type="text" id="email" className={!changeDetails ? 'profileEmail' : 'profileEmailActive'} disabled value={email} />
                    
                    </form>
                 </div>
              </main>
         </div>
}

export default Profile