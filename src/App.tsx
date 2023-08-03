import './App.css';
import api from './api/axiosConfig';
import React from "react";
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import { Movie } from './components/hero/Hero';
import { Review } from './components/reviews/Reviews';

function App() {

  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState<Movie>();
  const [reviews, setReviews] = useState<Review[]>([]);

  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");

      console.log(response.data);
  
      setMovies(response.data);
    } catch(err) {
      console.log(err);
    }
  }

  const getMovieData = async (movieId: any) => {
    try {
      const response = await api.get(`api/v1/movies/${movieId}`);

      const singleMovie = response.data;

      setMovie(singleMovie);
      
      setReviews(singleMovie.setReviews)
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getMovies();
  }, [])

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Home movies={movies}/>}></Route>
          <Route path='/Trailer/:ytTrailerId' element={<Trailer/>}></Route>
          <Route path='/Reviews/:movieId' element={<Reviews getMovieData={getMovieData} movie={movie as Movie} reviews={reviews} setReviews={setReviews}/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
