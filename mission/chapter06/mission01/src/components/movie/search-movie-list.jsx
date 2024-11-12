import useCustomFetch from "../../hooks/useCustomFetch"
import { Link,useSearchParams } from 'react-router-dom';
import MoviePoster from '../moviePoster/moviePoster';
import * as S from '../../pages/basicPages/searchPage/styled/searchPage.style'
import CardListSkeleton from "../Skeleton/card-list-skeleton";

const SearchMovieList = ()=>{
    const [searchParams, setSearchParams] = useSearchParams({
        mq : ''
    })
    const mq = searchParams.get('mq');
    const url = `/search/movie?query=${mq}&include_adult=false&language=ko-KR&page=1`   
    const {data: movies, isLoading, isError} = useCustomFetch(url);

    if (isError){
        return <h2>에러 발생</h2>
    }
    if(isLoading){
        return(
                <CardListSkeleton number = {20}/>
        )
    }

    if(mq && movies.data?.results.length === 0){
        return(
            <div style={{textAlign : 'center', marginTop : '30px'}}>
                <h1 style={{color: 'white'}}>해당하는 검색어 {mq}에</h1>
                <h1 style={{color: 'white'}}>해당하는 데이터가 없습니다</h1> 
            </div>
        )
    }

    return(
        <S.MovieGridContainer>
                {movies.data?.results.map((movie) => (
                    <Link to={`../movies/${movie.id}`}>
                        <MoviePoster poster_path={movie.poster_path} 
                        title = {movie.title} 
                        release_date = {movie.release_date}/>
                    </Link>
                ))}
        </S.MovieGridContainer>
    )
}

export default SearchMovieList;