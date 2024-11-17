import * as S from './styled/styled.js'

const Pagination = ({page,previousClick,nextClick, isdisabled}) => {
    return (
        <S.Container>
            {isdisabled ? null : <S.CustomButton onClick = {previousClick}>
                이전
            </S.CustomButton>}   
            <S.TextBox>
                {page} 페이지
            </S.TextBox>
            <S.CustomButton onClick={nextClick}>
                다음
            </S.CustomButton>
        </S.Container>
    )
}

export default Pagination