import {Link} from "react-router-dom";
import * as S from "./styled/styled.js"
import { getUserInfo, logOut } from "../../apis/axios-umcServer.js";

const Navbar = () => {
    //const {id, nickname} = getUserInfo()
    const nickname = "rasdfasd"
    return (
        <S.NavContainer>
            <Link to={'/'}><S.Logo>YONGCHA</S.Logo></Link>
            {/* {nickname 
            ? <S.IconContainer>
                <S.NicknameText>{nickname}님 반갑습니다</S.NicknameText>
                <Link to={'/'}><S.StyledButton color={'#111'}>로그아웃</S.StyledButton></Link>
            </S.IconContainer>
            :<S.IconContainer>
                <Link to={'/login'}><S.StyledButton color={'#111'}>로그인</S.StyledButton></Link>
                <Link to={'/signup'}><S.StyledButton color={'#111'}>회원가입</S.StyledButton></Link>
            </S.IconContainer> } */}
            <S.IconContainer>
                <S.NicknameText>{nickname}님 반갑습니다</S.NicknameText>
                <Link to={'/'}><S.StyledButton color={'#111'} onClick={logOut}>로그아웃</S.StyledButton></Link>
            </S.IconContainer>
        </S.NavContainer>
    );
};

export default Navbar;

