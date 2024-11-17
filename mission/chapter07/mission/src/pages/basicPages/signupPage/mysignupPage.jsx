import { useForm  } from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import * as S from '../styled/styled.js'
import signUpRequest from "./api/signupRequest.js";
import { useNavigate } from "react-router-dom";

const mySignupPage = ()=>{
    //email 유효성
    const signUpSchema = yup.object().shape({
        email : yup.string().email("유효한 이메일 형식이어야 합니다!").required('이메일을 반드시 입력해주세요.'),
        password : yup.string().min(8,'비밀번호는 8 ~ 16자 사이로 입력해주세요!',).max(16,'비밀번호는 8 ~ 16자 사이로 입력해주세요!').required('비밀번호를 반드시 입력해주세요.'),
        passwordCheck: yup.string()
            .oneOf([yup.ref('password')],"비밀번호와 일치하지 않습니다.")
            .required('비밀번호를 반드시 입력해주세요.')
    })
    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(signUpSchema),
        defaultValues:{
            email: '',
            password: '',
            passwordCheck: ''
        },
        mode: 'onChange'
    });
    const navigate = useNavigate();

    const onSubmit = async (data) =>{
        const signUpResult = await signUpRequest(data);
        console.log(signUpResult);
        navigate('/login');
    }
    

    return(
        <S.Container>
            <h2>회원가입</h2>
            <S.FormComponent onSubmit = {handleSubmit(onSubmit)}>
                <S.InputComponent type={'email'}{...register("email")} error = {errors.email}/> 
                {errors.email && <S.ErrorText>{errors.email?.message}</S.ErrorText>}
                <S.InputComponent type={'password'}{...register("password")} error = {errors.password}/> 
                {errors.password && <S.ErrorText>{errors.password?.message}</S.ErrorText>}
                <S.InputComponent type={'password'}{...register("passwordCheck")} error = {errors.passwordCheck}/>
                {errors.passwordCheck &&<S.ErrorText>{errors.passwordCheck?.message}</S.ErrorText>}
                <S.SubmitButton type={'submit'} disabled = {errors.email || errors.password || errors.passwordCheck}>제출</S.SubmitButton>
            </S.FormComponent>
        </S.Container>
    )
}

export default mySignupPage;