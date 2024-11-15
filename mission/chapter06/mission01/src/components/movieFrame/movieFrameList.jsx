import MovieFrame from "./movieFrame"
import * as S from '../../pages/basicPages/searchPage/styled/searchPage.style'
const MovieFrameList = ({number}) => {
    return(
        <S.MovieGridContainer>
        {new Array(number).fill(0).map((_,idx)=> <MovieFrame/>)}
        </S.MovieGridContainer>
    )
}

export default MovieFrameList;