import React, {useEffect, useRef} from 'react'
import './TitleCards.css'
import cards_data from '../../assets/Cards/cards_data.js'


const TitleCards = ({title, category}) => {
  const cardsRef = useRef(null);

  const handleWheel = (e) => {
    e.preventDefault();
    cardsRef.current?.scrollBy({ left: e.deltaY, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);
  
  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {cards_data.map((card, index) => {
          return <div className="card" key={index}>
            <img src={card.image} alt="" />
            <p>{card.name}</p>
          </div>
        })}
      </div>
    </div>
  )
}

export default TitleCards
