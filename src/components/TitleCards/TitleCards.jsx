import React, {useEffect, useRef, useState} from 'react'
import './TitleCards.css'
import cards_data from '../../assets/Cards/cards_data.js'
import {Link} from 'react-router-dom'



const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWQ2MjIyOTFkNzZlN2I0YTAzNjdiM2EwYjlhOGNkOCIsIm5iZiI6MTc1MzY2MTY1Mi4wMzEwMDAxLCJzdWIiOiI2ODg2YzBkNDYzMDkyMjJmZWU3MmVmNjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1pCsTA6nZUp4MANhYAGX8UeT3mwvUFbm1gz6Cky4SrY'
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    cardsRef.current?.scrollBy({ left: e.deltaY, behavior: 'smooth' });
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    const el = cardsRef.current;
    if (!el) return;

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);
  
  return (
    <div className='title__cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card__list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/movie/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500` +card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
