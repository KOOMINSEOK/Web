import * as S from './styled/styled'

const DetailFrame = ()=>{
    return(
        <S.PosterBox>  
            <S.DetailBox>
                <S.TitleBox/>
                <S.TextBox/>
                <S.TextBox/>
                <S.TextBox/>
                <S.TaglineBox/>
                <S.DescriptionBox/>
            </S.DetailBox>
        </S.PosterBox>
    )
}

export default DetailFrame;