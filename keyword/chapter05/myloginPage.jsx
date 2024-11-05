import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import './loginPage.css';
const LoginPage = ()=>{
    const emailSchema = yup.object().shape({
        email : yup.string().email('올바른 이메일 형식이 아닙니다 다시 확인해주세요!').required('이메일을 반드시 입력해주세요.'),
    })
    const pwdSchema = yup.object().shape({
        password : yup.string().min(8,'비밀번호는 8자~ 16자 사이로 입력해주세요!',).max(16,'비밀번호는 8자~ 16자 사이로 입력해주세요!').required('비밀번호를 반드시 입력해주세요.'),
    })
    const emailForm = useForm({
        resolver: yupResolver(emailSchema)
    })
    const pwdForm = useForm({
        resolver: yupResolver(pwdSchema)
    })

    const onSubmit = (data)=>{
        console.log('폼 데이터 제출');
        console.log(data);
    }

    return(
        <div className="login_form_container">
            <h2>로그인</h2>
            <form className="login_form" >
            <input type={'email'}{...emailForm.register("email")} placeholder="이메일을 입력해주세요!" onFocus={emailForm.handleSubmit(onSubmit)} />
            <p style={{color: 'red'}}>{emailForm.formState.errors.email?.message}</p>
            <input type={'password'}{...pwdForm.register("password")} placeholder="비밀번호를 입력해주세요!" onFocus={pwdForm.handleSubmit(onSubmit)} />
            <p style={{color: 'red'}}>{pwdForm.formState.errors.password?.message}</p>
            <input type={'submit'} value="로그인" className="submit" />
            </form>
        </div>
        
    )
}

export default LoginPage;