import React, { useEffect, useState } from 'react';
import './MovieDetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import back__arrow__icon from '../../assets/back__arrow__icon.png';
import play__icon from '../../assets/play__icon.png';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
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
    const fetchMovieDetails = async () => {
      try {
        // Fetch movie details
        const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);
        const movieData = await movieResponse.json();
        
        // Fetch cast details
        const castResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options);
        const castData = await castResponse.json();
        
        setMovie(movieData);
        setCast(castData.cast?.slice(0, 10) || []); // Get top 10 cast members
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="movie__details loading">
        <img src={back__arrow__icon} alt="Back" onClick={() => navigate(-1)} className="back__arrow" />
        <div className="loading__text">Loading movie details...</div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="movie__details error">
        <img src={back__arrow__icon} alt="Back" onClick={() => navigate(-1)} className="back__arrow" />
        <div className="error__content">
          <h2>Movie not found</h2>
          <p>Sorry, we couldn't load the movie details.</p>
          <button onClick={() => navigate(-1)} className="go__back-btn">Go Back</button>
        </div>
      </div>
    );
  }

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatRating = (rating) => {
    return rating ? rating.toFixed(1) : 'N/A';
  };

  return (
    <div className="movie__details">
      <img src={back__arrow__icon} alt="Back" onClick={() => navigate(-1)} className="back__arrow" />
      
      <div className="movie__hero" style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
      }}>
        <div className="movie__content">
          <div className="movie__poster">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title}
              onError={(e) => {
                e.target.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450"><rect width="100%" height="100%" fill="#333"/><text x="50%" y="50%" fill="white" text-anchor="middle" dy=".3em" font-family="Arial" font-size="18">No Image</text></svg>')}`;
              }}
            />
          </div>
          
          <div className="movie__info">
            <h1 className="movie__title">{movie.title}</h1>
            
            <div className="movie__meta">
              <span className="rating">⭐ {formatRating(movie.vote_average)}</span>
              <span className="year">{new Date(movie.release_date).getFullYear()}</span>
              <span className="runtime">{formatRuntime(movie.runtime)}</span>
              <span className="rating__badge">{movie.adult ? '18+' : 'PG-13'}</span>
            </div>

            <div className="genres">
              {movie.genres?.map(genre => (
                <span key={genre.id} className="genre__tag">{genre.name}</span>
              ))}
            </div>

            <p className="movie__overview">{movie.overview}</p>

            <div className="action__buttons">
              <button 
                className="play__btn"
                onClick={() => navigate(`/player/${id}`)}
              >
                <img src={play__icon} alt="Play" />
                Play Trailer
              </button>
              <button className="wishlist__btn">+ My List</button>
            </div>
          </div>
        </div>
      </div>

      <div className="movie__details--content">
        <div className="cast__section">
          <h3>Cast</h3>
          <div className="cast__grid">
            {cast.map(actor => (
              <div key={actor.id} className="cast__card">
                <img 
                  src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 200 300"><rect width="100%" height="100%" fill="#333"/><text x="50%" y="50%" fill="white" text-anchor="middle" dy=".3em" font-family="Arial" font-size="16">No Image</text></svg>')}`} 
                  alt={actor.name}
                />
                <div className="cast__info">
                  <p className="actor__name">{actor.name}</p>
                  <p className="character__name">{actor.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="movie__stats">
          <div className="stat__item">
            <h4>Director</h4>
            <p>{movie.production_companies?.[0]?.name || 'Unknown'}</p>
          </div>
          <div className="stat__item">
            <h4>Budget</h4>
            <p>{movie.budget ? `$${(movie.budget / 1000000).toFixed(1)}M` : 'Unknown'}</p>
          </div>
          <div className="stat__item">
            <h4>Revenue</h4>
            <p>{movie.revenue ? `$${(movie.revenue / 1000000).toFixed(1)}M` : 'Unknown'}</p>
          </div>
          <div className="stat__item">
            <h4>Language</h4>
            <p>{movie.original_language?.toUpperCase()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;