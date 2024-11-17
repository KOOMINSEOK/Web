import * as S from './styled/styled'

const MovieFrame = ()=>{
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

export default MovieFrame;