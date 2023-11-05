import './App.css';
import { Routes, Route, BrowserRouter, Navigate} from 'react-router-dom';
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ChatComponent from './pages/ChatComponent';
import Support from './pages/Support';
import Forgot from './pages/Forgot';
import Profile from './pages/Profile';
import Navbar from "./components/Navbar"
import { useContext } from 'react';
import { AuthContext } from './contextApi/AuthContext';

function App() {

    const {currentUser}  = useContext(AuthContext) 


    // Creating a protected route
    const ProtectedRoute = ({children}) => {
        if (!currentUser) {
          return <Navigate to="/signin"/>
        }

        return children
    }


  return (
    <>
        <BrowserRouter>
                {/* Common Components */}
                <Routes>
                    <Route path="/signin" element={<SignIn/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/" element={
                    <ProtectedRoute>
                        <ChatComponent/>
                    </ProtectedRoute>
                    }/>
                    <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile/>
                    </ProtectedRoute>
                    }/>
                    <Route path="/forgot" element={ <Forgot/> }/>
                    <Route path="/support" element={ <Support/> }/>
                </Routes>

                <Navbar/>
        </BrowserRouter>
        <ToastContainer/>
    </>
  )
}

export default App;
