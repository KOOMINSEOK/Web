import {Link} from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
    return (
        <NavContainer>
            <Link to={'/'}><Logo>YONGCHA</Logo></Link>
            <div>
            <Link to={'/login'}><StyledButton color={'#111'}>로그인</StyledButton></Link>
            <Link to={'/signup'}><StyledButton color={'#111'}>회원가입</StyledButton></Link>
            </div>
        </NavContainer>
    );
};

export default Navbar;

const NavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: #1b1b1b;
    align-items: center;
`
const StyledButton = styled.button`
    background-color: ${props => props.color};
    border: none;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    margin-left: 10px;
    cursor: pointer;
    font-size: 16px;
    &:hover {
     background-color: #ff007c;
    }
`
const Logo = styled.h2`
    color: #ff007c;
    padding-left : 20px;
`