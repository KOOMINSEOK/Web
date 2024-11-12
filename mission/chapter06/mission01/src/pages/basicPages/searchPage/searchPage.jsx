import { useState } from 'react';
import * as S from './styled/searchPage.style'
import {useNavigate, useSearchParams} from 'react-router-dom'
import SearchMovieList from '../../../components/movie/search-movie-list';

const SearchPage = ()=>{
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const onChangeSearchValue = (event) =>{
        setSearchValue(event.target.value);
    }

    const [searchParams, setSearchParams] = useSearchParams({
        mq : ''
    })

    const mq = searchParams.get('mq');
    
    const handleSearchMovie = ()=>{
        if(mq === searchValue) return;
        navigate(`/search?mq=${searchValue}`)
    }
    const handleSearchMovieWithKeyboard = (e)=>{
        if(e.key === 'Enter'){
            handleSearchMovie();
        }
    }
   
    return(
        <>
            <S.SearchContainer>
                <input placeholder='영화 제목을 입력하세요...' onChange={onChangeSearchValue} onKeyDown={handleSearchMovieWithKeyboard}/>
                <button onClick={handleSearchMovie}>검색</button>
            </S.SearchContainer>
            <SearchMovieList/>
        </>
    )
}

export default SearchPage;