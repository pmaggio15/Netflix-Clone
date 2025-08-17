import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';  
import Navbar from '../../components/Navbar/Navbar';
import hero__banner from '../../assets/hero__banner.jpeg';
import hero__title from '../../assets/hero__title.svg';
import play__icon from '../../assets/play__icon.png';
import info__icon from '../../assets/info__icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';

const AVENGERS_ID = 24428; 

const Home = () => {
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate(`/player/${AVENGERS_ID}`, { state: { title: 'The Avengers' } });
  };

  const handleMoreInfo = () => {
    navigate(`/movie/${AVENGERS_ID}`);
  };

  return (
    <div className='home'>
      <Navbar />
      <div className='hero'>
        <img src={hero__banner} alt="" className='banner__img' />
        <div className="hero__caption">
          <img src={hero__title} alt="" className='caption__img'/>
          <p>After clashing egos and setbacks, the heroes learn to work as a team, close the portal, and defeat Loki, marking the birth of the Avengers.</p>

          <div className="hero__btns">
            <button className='btn' onClick={handlePlay}>
              <img src={play__icon} alt="" />Play
            </button>

            <button className='btn dark__btn' onClick={handleMoreInfo}>
              <img src={info__icon} alt="" />More Info
            </button>
          </div>

          <TitleCards />
        </div>
      </div>

      <div className="more__cards">
        <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
        <TitleCards title={"Adventure & Action Movies"} category={"popular"} />
        <TitleCards title={"Upcoming"} category={"upcoming"} />
        <TitleCards title={"Watch It Again"} category={"now_playing"} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;


