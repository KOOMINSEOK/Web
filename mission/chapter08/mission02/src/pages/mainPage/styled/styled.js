import styled from 'styled-components'
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 60%;

`
export const Input = styled.input`
    padding: 20px;
    border: 1px solid purple;
    border-radius: 10px;
    width: 100%;
`

export const Button = styled.button`
    border: 10px;
    border: none;
    border-radius: 10px;
    padding: 20px;
    font-size: 15px;
`
export const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 25px;
    width: 60%;
`
export const TodoListcontainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    gap: 20px;
`

export const LoaderContainer = styled.div`
    margin-top: 50px;
`