import React, {useEffect, useRef, useState} from 'react'
import './TitleCards.css'
import cards_data from '../../assets/Cards/cards_data.js'


const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDVmOGM3ZGI3NjU3MGI0Mzc3OWMzODQwYjRkMmU3YSIsIm5iZiI6MTc1MzY2MTY1Mi4wMzEwMDAxLCJzdWIiOiI2ODg2YzBkNDYzMDkyMjJmZWU3MmVmNjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.QQRVmExWaXGMHoX2-ZHMEZT8bLagHvSn1SqXNGS5GU8'
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    cardsRef.current?.scrollBy({ left: e.deltaY, behavior: 'smooth' });
  };

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
    .then(res => res.json())
    .then(res => setApiData(response.results))
    .catch(err => console.error(err));

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
