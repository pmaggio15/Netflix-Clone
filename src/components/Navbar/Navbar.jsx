import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import bell__icon from '../../assets/bell__icon.svg'
import profile__img from '../../assets/profile__img.png'
import caret__icon from '../../assets/caret__icon.svg'
import { logout } from '../../firebase'
import { Link } from 'react-router-dom'

function Navbar() {
  const navRef = useRef();

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
          <li>New & Popular</li>
        </ul>
      </div>
      <div className="navbar__right">
        <p>Children</p>
        <img src={bell__icon} alt="" className='icons'/>
        <div className='navbar__profile'>
          <img src={profile__img} alt="" className='profile'/>
          <img src={caret__icon} alt="" />
          <div className="dropdown">
            <p onClick={() => {logout()}}>Sign Out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar