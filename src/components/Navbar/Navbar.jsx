import React, { useEffect, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import bell__icon from '../../assets/bell__icon.svg'
import profile__img from '../../assets/profile__img.png'
import caret__icon from '../../assets/caret__icon.svg'
import { logout, auth } from '../../firebase'
import { Link } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'

function Navbar() {
  const navRef = useRef();
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY >= 80) {
          navRef.current.classList.add('nav__dark')
        } else {
          navRef.current.classList.remove('nav__dark')
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  // Get user data when auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        try {
          // Get user document from Firestore
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserName(userData.name || currentUser.displayName || 'User');
          } else {
            // Fallback to email name or display name
            setUserName(currentUser.displayName || currentUser.email?.split('@')[0] || 'User');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Fallback name
          setUserName(currentUser.displayName || currentUser.email?.split('@')[0] || 'User');
        }
      } else {
        setUser(null);
        setUserName('');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleManageProfiles = () => {
    console.log('Manage Profiles clicked');
  };

  const handleTransferProfile = () => {
    console.log('Transfer Profile clicked');
  };

  const handleAccount = () => {
    console.log('Account clicked');
  };

  const handleHelpCenter = () => {
    window.open('https://help.netflix.com', '_blank');
  };

  return (
    <div ref={navRef} className='navbar'>
      <div className="navbar__left">
        <Link to="/">
          <img src={logo} alt="Netflix" />
        </Link>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>Games</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="navbar__right">
        <p>Kids</p>
        <img src={bell__icon} alt="" className='icons'/>
        <div className='navbar__profile'>
          <img src={profile__img} alt="" className='profile'/>
          <img src={caret__icon} alt="" />
          <div className="dropdown">
            <div className="dropdown__header">
              <img src={profile__img} alt="Profile" className="dropdown__profile__img" />
              <span>{userName || 'User'}</span>
            </div>
            
            <div className="dropdown__divider"></div>
            
            <div className="dropdown__item" onClick={handleManageProfiles}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
              </svg>
              <span>Manage Profiles</span>
            </div>
            
            <div className="dropdown__item" onClick={handleTransferProfile}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 4A5.5 5.5 0 002 9.5c0 .5.09 1 .22 1.5H6.3c-.13-.47-.3-1-.3-1.5A3.5 3.5 0 0110.5 6 3.5 3.5 0 0114 9.5c0 .5-.17 1.03-.3 1.5h4.08c.13-.5.22-1 .22-1.5A5.5 5.5 0 0012.5 4h-5z" fill="currentColor"/>
              </svg>
              <span>Transfer Profile</span>
            </div>
            
            <div className="dropdown__item" onClick={handleAccount}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
              </svg>
              <span>Account</span>
            </div>
            
            <div className="dropdown__item" onClick={handleHelpCenter}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" fill="currentColor"/>
              </svg>
              <span>Help Center</span>
            </div>
            
            <div className="dropdown__divider"></div>
            
            <div className="dropdown__item2 signout" onClick={() => {logout()}}>
              <span>Sign out of Netflix</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar

