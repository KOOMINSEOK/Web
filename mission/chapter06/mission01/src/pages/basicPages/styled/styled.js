import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`
export const FormComponent = styled.form`
    display: flex;
    flex-direction: column;
`
export const InputComponent = styled.input`
    margin-bottom: 13px;
    height: 50px;
    width: 350px;
    border-radius: 8px;
    border: ${props => (props.error ? '4px solid red' : '')};

`
export const ErrorText = styled.p`
    color: red;
    margin-top: 0px ;
    font-size: 13px;
`
export const SubmitButton = styled.button`
    background-color: ${props => (props.disabled ? 'gray' : '#ff007c')};
    color: white;
    font-weight: 400;
    font-size: 16px 
`