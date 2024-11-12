import { useState, useEffect } from 'react'
import MoviePoster from '../../../components/moviePoster/moviePoster.jsx';
import './moviesPages.css'
import axios from "axios";
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../../apis/axios-instance.js';
import useCustomFetch from '../../../hooks/useCustomFetch.js';
import { Link } from "react-router-dom";
import CardListSkeleton from '../../../components/Skeleton/card-list-skeleton.jsx';

const APIurl={
  "now-playing" : '/movie/now_playing?language=ko-KR&page=1',
  "popular" : '/movie/popular?language=ko-KR&page=1',
  "top-rated" : '/movie/top_rated?language=ko-KR&page=1', 
  "up-coming" :'/movie/upcoming?language=ko-KR&page=1'
}

const MoviesPage = (props) => {
    const {category} = props
    const {data : movies, isLoading, isError} = useCustomFetch(APIurl[category]);
    if(isLoading){
      return <CardListSkeleton number={20}/>
    }
    
    if(isError){
      return<div><h1 style={{color: 'white'}}>에러 발생</h1></div>
    }
    return (
      <>
        <div className="movie_poster_list">
          {movies.data?.results.map((movie) => (
            <Link to={`../movies/${movie.id}`}>
              <MoviePoster poster_path={movie.poster_path} 
                          title = {movie.title} 
                          release_date = {movie.release_date}/>
            </Link>
          ))}
        </div>
      </>
    )
}

export default MoviesPage;