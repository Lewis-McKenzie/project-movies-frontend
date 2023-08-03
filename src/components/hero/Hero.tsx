import React from 'react';
import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export type Movie = {
    poster: string,
    title: string,
    backdrops: any,
    trailerLink: string,
    imdbId: string,
}

type Movies = {
    movies: Movie[]
}

const Hero = ({movies}: Movies) => {

    const navigate = useNavigate();

    function reviews(movieId: any) {
        navigate(`/Reviews/${movieId}`);
    }

  return (
    <div className='movie-carousel-container'>
        <Carousel>
            {
                movies.map((movie: Movie) => {
                    const backgroundImage = movie.backdrops && movie.backdrops.length > 0 ? `url(${movie.backdrops[0]})` : 'none';
                    const cardStyle = { '--img': backgroundImage } as React.CSSProperties;
          
                    return (
                        <Paper>
                            <div className='movie-card-container'>
                                <div className="movie-card" style={cardStyle}>
                                    <div className='movie-detail'>
                                        <div className='movie-poster'>
                                            <img src={movie.poster} alt="" />
                                        </div>
                                        <div className='movie-title'>
                                            <h4>{movie.title}</h4>
                                        </div>
                                        <div className='movie-buttons-container'>
                                            <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                                <div className="play-button-icon-container">
                                                    <FontAwesomeIcon className="play-button-icon" icon={faCirclePlay}/>
                                                </div>
                                            </Link>
                                            <div className="movie-review-button-container">
                                                <Button variant='info' onClick={() => reviews(movie.imdbId)}>Reviews</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    )
                })
            }
        </Carousel>
    </div>
  )
}

export default Hero;