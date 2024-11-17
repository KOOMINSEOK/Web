import styled, {keyframes} from 'styled-components'

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

export const CastCardBox = styled.div`
    margin-top: 15px;
    width: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`
export const ProfileBox = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    background-color: lightgray;
    animation: ${skeleton} 1s 1s infinite linear alternate;
`
export const TextBox = styled.span`
    margin-top: 2px;
    height : 10px;
    width : 100px;
    background-color: lightgray;
    border-radius: 10px;
    animation: ${skeleton} 1s 1s infinite linear alternate;
`

export const CastList =styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    flex-wrap: wrap;
`