import styled, { keyframes } from 'styled-components'

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

export const PosterBox = styled.div`
    width: 100%;
    height: 450px;
    position: relative;
    display: inline-block;
    background-color: lightgrey;
    border-radius: 10px;
    animation: ${skeleton} 1s 1s infinite linear alternate;
`
export const DetailBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    display: flex;
    width: 40%;
    height: 100%;

`
export const TitleBox = styled.h1`
    width: 400px;
    height: 50px;
    background-color: gray;
    border-radius: 10px;
    animation: ${skeleton} 1s 1s infinite linear alternate;
`
export const TextBox = styled.span`
    margin-bottom: 10px;
    width: 100px;
    height: 25px;
    background-color: gray;
    border-radius: 10px;
    animation: ${skeleton} 1s 1s infinite linear alternate;
`
export const TaglineBox = styled.p`
    width: 250px;
    height: 35px;
    font-size: 24px;
    font-weight: 800;
    background-color: gray;
    border-radius: 10px;
    animation: ${skeleton} 1s 1s infinite linear alternate;
`
export const DescriptionBox = styled.p`
    width: 500px;
    height: 100px;
    background-color: gray;
    border-radius: 10px;
    animation: ${skeleton} 1s 1s infinite linear alternate;
`