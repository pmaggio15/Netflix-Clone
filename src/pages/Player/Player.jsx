import React from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'

function Player() {
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" />
      <iframe width='90%' height='90%'
      src='https://www.youtube.com/embed/'></iframe>
    </div>
  )
}

export default Player
