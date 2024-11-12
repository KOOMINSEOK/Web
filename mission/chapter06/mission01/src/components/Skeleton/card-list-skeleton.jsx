import CardSkeleton from "./card-skeleton"
import * as S from '../../pages/basicPages/searchPage/styled/searchPage.style'
const CardListSkeleton = ({number}) => {
    return(
        <S.MovieGridContainer>
        {new Array(number).fill(0).map((_,idx)=> <CardSkeleton/>)}
        </S.MovieGridContainer>
    )
}

export default CardListSkeleton;