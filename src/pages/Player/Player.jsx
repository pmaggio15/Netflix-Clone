import React, { useEffect, useState } from 'react'
import './Player.css'
import back__arrow__icon from '../../assets/back__arrow__icon.png'
import { useNavigate, useParams } from 'react-router-dom'

function Player() {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWQ2MjIyOTFkNzZlN2I0YTAzNjdiM2EwYjlhOGNkOCIsIm5iZiI6MTc1MzY2MTY1Mi4wMzEwMDAxLCJzdWIiOiI2ODg2YzBkNDYzMDkyMjJmZWU3MmVmNjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1pCsTA6nZUp4MANhYAGX8UeT3mwvUFbm1gz6Cky4SrY`
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => {
      console.log(`Videos for movie ${id}:`, res);
      
      if (res.results && res.results.length > 0) {
        const bestVideo = 
          res.results.find(video => video.site === 'YouTube' && video.type === 'Trailer') ||
          res.results.find(video => video.site === 'YouTube' && video.type === 'Teaser') ||
          res.results.find(video => video.site === 'YouTube') ||
          res.results[0];
        
        console.log(`Selected video for ${id}:`, bestVideo);
        
        if (bestVideo && bestVideo.key) {
          setApiData(bestVideo);
          setError(false);
        } else {
          console.log(`No valid video found for movie ${id}`);
          setError(true);
        }
      } else {
        console.log(`No videos available for movie ${id}`);
        setError(true);
      }
      setLoading(false);
    })
    .catch(err => {
      console.error(`Error fetching videos for movie ${id}:`, err);
      setError(true);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className='player'>
        <img src={back__arrow__icon} alt="" onClick={() => {navigate(-1)}} />
        <div style={{color: 'white', textAlign: 'center', fontSize: '24px'}}>
          Loading trailer...
        </div>
      </div>
    );
  }

  if (error || !apiData.key) {
    return (
      <div className='player'>
        <img src={back_arrow_icon} alt="" onClick={() => {navigate(-1)}} />
        <div style={{color: 'white', textAlign: 'center', padding: '50px'}}>
          <h2>No trailer available</h2>
          <p>This movie doesn't have a YouTube trailer available.</p>
          <button 
            onClick={() => navigate(-1)}
            style={{
              padding: '10px 20px',
              background: '#e50914',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className='player'>
      <img src={back__arrow__icon} alt="" onClick={() => {navigate(-1)}} />
      <iframe 
        width='90%' 
        height='90%'
        src={`https://www.youtube.com/embed/${apiData.key}?autoplay=1&mute=1`}
        title='trailer'
        frameBorder='0' 
        allowFullScreen
      ></iframe>
      <div className="player__info">
        <p>{apiData.published_at ? apiData.published_at.slice(0,10) : 'Date not available'}</p>
        <p>{apiData.name || 'Title not available'}</p>
        <p>{apiData.type || 'Type not available'}</p>
      </div>
    </div>
  )
}

export default Player