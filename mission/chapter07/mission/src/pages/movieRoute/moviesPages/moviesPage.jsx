import MoviePoster from '../../../components/moviePoster/moviePoster.jsx';
import { Link } from "react-router-dom";
import MovieFrameList from '../../../components/movieFrame/movieFrameList.jsx';
import { useGetMovies } from '../../../hooks/queries/useGetMovies.js';
import { useQuery } from '@tanstack/react-query';
import { useGetInfiniteMovies } from '../../../hooks/queries/useGetInfiniteMovies.js';
import * as S from './styled/styled.js'
import {useInView} from "react-intersection-observer"
import { useEffect } from 'react';
import {ClipLoader} from 'react-spinners'
const APIurl={
  "now-playing" : 'now_playing',
  "popular" : 'popular',
  "top-rated" : 'top_rated', 
  "up-coming" :'upcoming'
}

const MoviesPage = (props) => {
    const {category} = props
    //const {data : movies, isLoading, isError} = useCustomFetch(APIurl[category]);
    // const {data : movies, isPending, isError} = useQuery({
    //   queryFn : ()=> useGetMovies({category: APIurl[category], pageParam: 1}),
    //   queryKey : ['movies',category],
    //   cacheTime: 10000,
    //   staleTime : 10000,
      
    // })

    const {data: movies, 
      isLoading,
      isFetching, 
      hasNextPage, 
      isPending, 
      fetchNextPage, 
      isFetchingNextPage, 
      error,
      isError
    } = useGetInfiniteMovies(APIurl[category]);
    console.log("movies");
    console.log(movies);

    const {ref, inView} = useInView({
      threshold : 0,
    })

    useEffect(() => {
      if(inView){
        !isFetching && hasNextPage && fetchNextPage();
      }
    },[inView, isFetching, hasNextPage, fetchNextPage])

    
    if(isError){
      return<div><h1 style={{color: 'white'}}>에러 발생</h1></div>
    }
    return (
      <>
        <S.MoviePosterList>
          {movies?.pages?.map((page) => (
            page?.results?.map((movie,_)=>(
            <Link to={`../movies/${movie.id}`}>
              <MoviePoster poster_path={movie.poster_path} 
                          title = {movie.title} 
                          release_date = {movie.release_date}/>
            </Link>
            ))
          ))}
        </S.MoviePosterList>
        {isFetching && <MovieFrameList number={20}/> }
        <S.ObserveBox ref = {ref}><ClipLoader color='white'/></S.ObserveBox>
      </>
    )
}

export default MoviesPage;