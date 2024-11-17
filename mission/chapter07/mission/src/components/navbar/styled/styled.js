import styled from "styled-components"

export const NavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: #1b1b1b;
    align-items: center;
`
export const StyledButton = styled.button`
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
export const Logo = styled.h2`
    color: #ff007c;
    padding-left : 20px;
`
export const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`
export const NicknameText = styled.p`
    color: white;

`