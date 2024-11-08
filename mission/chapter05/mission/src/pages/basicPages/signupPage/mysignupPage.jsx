import { useForm } from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import './signupPage.css'

const mySignupPage = ()=>{
    //email 유효성
    const emailSchema = yup.object().shape({
        email : yup.string().email("유효한 이메일 형식이어야 합니다!").required('이메일을 반드시 입력해주세요.'),
    })
    const emailForm = useForm({
        resolver: yupResolver(emailSchema)
    })
    //비밀번호 유효성
    const passwordSchema = yup.object().shape({
        password : yup.string().min(8,'비밀번호는 8자 이상이어야 합니다.',).max(16,'비밀번호는 16자 이하여야 합니다.').required('비밀번호를 반드시 입력해주세요.'),
        passwordCheck: yup.string()
            .oneOf([yup.ref('password')],"비밀번호와 일치하지 않습니다.")
            .required('비밀번호를 반드시 입력해주세요.')
    })
    const passwordForm = useForm({
        resolver: yupResolver(passwordSchema)
    })
    //비밀번호 확인 유효성
    const passwordCheckSchema = passwordSchema.concat(
        yup.object().shape({
            passwordCheck: yup.string()
            .oneOf([yup.ref('password')],"비밀번호와 일치하지 않습니다.")
            .required('비밀번호를 반드시 입력해주세요.')
        })
    )
    
    const passwordCheckForm = useForm({
        resolver: yupResolver(passwordCheckSchema)
    })


    const onSubmit = (data) =>{
        console.log("폼 데이터 제출");
        console.log(data);
    }

    return(
        <div className="signup_form_container">
            <h2>회원가입</h2> 
            <form className="signup_form">
                <input type={'email'}{...emailForm.register("email")} onFocus = {emailForm.handleSubmit()}/>
                <p style={{color: 'red'}}>{emailForm.formState.errors.email?.message}</p>
                <input type={'password'}{...passwordForm.register("password")} onFocus = {passwordForm.handleSubmit()}/>
                <p style={{color: 'red'}}>{passwordForm.formState.errors.password?.message}</p>
                <input type={'password'}{...passwordCheckForm.register("passwordCheck")} onFocus = {passwordCheckForm.handleSubmit()}/>
                <p style={{color: 'red'}}>{passwordCheckForm.formState.errors.passwordCheck?.message}</p>
                <input className ="submit" type={'submit'}/>
            </form>
        </div>
    )
}

export default mySignupPage;