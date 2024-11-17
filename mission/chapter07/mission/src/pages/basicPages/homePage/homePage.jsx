import { useState } from "react";
import movies from '../../../mocks/movies.js'
import MoviePoster from "../../../components/moviePoster/moviePoster";
import { Link } from "react-router-dom";
import * as S from './sytled/styled.js';

const HomePage = ()=>{
    const [movieList, setMovieList] = useState(movies.results);

    return (
      <>
        <S.MoviePosterList>
          {movieList.map((movie) => (
            <Link to={`../movies/${movie.id}`}>
              <MoviePoster poster_path={movie.poster_path} 
              title = {movie.title} 
              release_date = {movie.release_date}/>
            </Link>
          ))}

        </S.MoviePosterList>
      </>
    )
}

export default HomePage;    