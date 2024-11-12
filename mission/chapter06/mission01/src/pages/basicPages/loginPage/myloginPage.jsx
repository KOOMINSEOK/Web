import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import * as S from '../styled/styled.js';
import { useNavigate } from "react-router-dom";

// import './loginPage.css';
const LoginPage = ()=>{
    const loginSchema = yup.object().shape({
        email : yup.string().email("유효한 이메일 형식이어야 합니다!").required('이메일을 반드시 입력해주세요.'),
        password : yup.string().min(8,'비밀번호는 8 ~ 16자 사이로 입력해주세요!',).max(16,'비밀번호는 8 ~ 16자 사이로 입력해주세요!').required('비밀번호를 반드시 입력해주세요.'),
    })
    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues:{
            email: '',
            password: '',
        },
        mode: 'onChange'
    });
    const navigate = useNavigate();
    const onSubmit = (data)=>{
        console.log('폼 데이터 제출');
        console.log(data);
        navigate('/')
    }

    return(
        <S.Container>
            <h2>로그인</h2>
            <S.FormComponent onSubmit={handleSubmit(onSubmit)}>
            <S.InputComponent type={'email'}{...register("email") } error = {errors.email} placeholder="이메일을 입력해주세요!"/>
            {errors.email && <S.ErrorText style={{color: 'red'}}>{errors.email?.message}</S.ErrorText>}
            <S.InputComponent type={'password'}{...register("password")} error = {errors.password} placeholder="비밀번호를 입력해주세요!" />
            {errors.password && <S.ErrorText style={{color: 'red'}}>{errors.password?.message}</S.ErrorText>}
            <S.SubmitButton disabled = {errors.email || errors.password}>로그인</S.SubmitButton>
            </S.FormComponent >
        </S.Container>
        
    )
}
export default LoginPage;