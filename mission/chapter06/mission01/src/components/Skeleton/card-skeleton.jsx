import * as S from './styled/card-skeleton.styled'

const CardSkeleton = ()=>{
    return(
        <S.Container>
            <S.CardMain/>
            <S.TextWrapper>
                <S.TitleBox/>
                <S.DescriptionBox/>
            </S.TextWrapper>
        </S.Container>
    )
}

export default CardSkeleton;