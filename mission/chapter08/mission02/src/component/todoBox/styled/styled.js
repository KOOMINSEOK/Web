import styled from "styled-components";

export const TodoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid black;
    border-radius: 10px;
    padding: 10px;
    gap: 20px;
    width: 700px;
`
export const Checkbox = styled.input`
    margin-right: 10px;
`
export const ContentContainer = styled.div`
    display: flex;
    flex-direction: row;
`
export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
`
export const Text = styled.p`
    text-decoration: none;
    font-size: 15px;
`
export const Button = styled.button`
    padding: 10px 20px 10px 20px;
    margin-left: 10px;
    border: none;
    border-radius: 10px;
`
export const EditInput = styled.input`
    border: 1px solid black;
`