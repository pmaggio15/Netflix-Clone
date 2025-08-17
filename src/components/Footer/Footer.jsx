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
        <li>Audio Description</li>
        <li>Investor Releations</li>
        <li>Privacy</li>
        <li>Contact Us</li>
        <li>Help Center</li>
        <li>Jobs</li>
        <li>Legal Notices</li>
        <li>Do Not Sell or Share My Personal Information</li>
        <li>Gift Cards</li>
        <li>Netflix Shop</li>
        <li>Cookie Preferences</li>
        <li>Ad Choices</li>
        <li>Media Center</li>
        <li>Terms of Use</li>
        <li>Corporate Information</li>
      </ul>
      <p className='copyright__text'>© 1997-2025 Netflix, Inc.</p>
    </div>
  )
}

export default Footer
