import React from 'react'
import './Footer.css'
import youtube__icon from '../../assets/youtube__icon.png'
import twitter__icon from '../../assets/twitter__icon.png'
import instagram__icon from '../../assets/instagram__icon.png'
import facebook__icon from '../../assets/facebook__icon.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer__icons">
        <img src={youtube__icon} alt="" />
        <img src={twitter__icon} alt="" />
        <img src={instagram__icon} alt="" />
        <img src={facebook__icon} alt="" />
      </div>
      <ul>
        <li>Help Center</li>
        <li>Media Center</li>
        <li>investor Relations</li>
        <li>Jobs</li>
        <li>Terms of Use</li>
        <li>Privacy</li>
        <li>Legal Notices</li>
        <li>Contact Us</li>
      </ul>
      <p className='copyright__text'>© 1997-2025 Netflix, Inc.</p>
    </div>
  )
}

export default Footer
