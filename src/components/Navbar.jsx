import { useNavigate, useLocation } from "react-router-dom"
import {EnvelopeIcon, UserCircleIcon, ChatBubbleOvalLeftIcon }  from  "@heroicons/react/24/outline"

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const pathMatchRoute = (route) => {
    //check if thr route === pathname
    if (route === location.pathname) {
        return true
    }
}

  return (
    <footer className="navbar">
    <nav className="navbarNav">
        <ul className="navbarListItems">

            <li className="navbarListItem"onClick={() => navigate('/')}>
                <ChatBubbleOvalLeftIcon fill={pathMatchRoute('/') ? '#00827f' : '#8f8f8f'} width='36px' height="36px"/>
                <p>Chat</p>
            </li>

            <li className="navbarListItem" onClick={() => navigate('/profile')}>
                <UserCircleIcon fill={pathMatchRoute('/profile') ? '#00827f' : '#8f8f8f'} width='36px' height="36px"/>
                <p>Profile</p>
            </li>

            <li className="navbarListItem" onClick={() => navigate('/support')}>
                <EnvelopeIcon fill={pathMatchRoute('/support') ? '#00827f' : '#8f8f8f'} width='36px' height="36px"/>
                <p>Support</p>
            </li>
        </ul>
    </nav>
</footer>
  )
}

export default Navbar