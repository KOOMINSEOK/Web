import styled, { keyframes } from "styled-components";

const skeleton = keyframes`
    0%{
        opacity: 1;
    }
    30%{
        opacity: 0.7;
    }
    50%{
        opacity: 0.4;
    }
    80%{
        opacity: 0.8;
    }
    100%{
        opacity: 1;
    }
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 300px;
    width: 160px;
    position: relative;
    overflow: hidden;
    color: white;

`
export const CardMain = styled.div`
    background-color: rgb(230,230,230);
    width: 100%;
    height: 80%;
    border-radius: 10px;
    animation: ${skeleton} 3s 1s infinite linear alternate;
`
export const TextWrapper = styled.div`
    width: 160px;
    height: 30px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-top: 5px;
    
`
export const TitleBox = styled.div`
    background-color: rgb(230,230,230);
    height: 14px;
    border-radius: 10px;
    animation: ${skeleton} 3s 1s infinite linear alternate;
`
export const DescriptionBox = styled.div`
    background-color: rgb(230,230,230);
    height: 10px;
    border-radius: 10px;
    animation: ${skeleton} 3s 1s infinite linear alternate;
`

