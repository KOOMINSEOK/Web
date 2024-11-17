import useForm  from "../../../hooks/useForm.js";
import { validateSignup} from "../../../utils/validate.js";
import * as S from '../styled/styled.js'
import { useNavigate  } from "react-router-dom";
import signUpRequest from "./api/signupRequest.js";

const SignupPage = ()=>{
    const signup = useForm({
        initialValue:{
            email: '',
            password: '',
            passwordCheck: '',
        },
        validate: validateSignup
    })
    
    const onSubmit = async (data) =>{
        const signUpResult = await signUpRequest(data);
        console.log(signUpResult);
    }
    
    const isDisabled = !(signup.touched.password && !signup.errors.password &&signup.touched.email && !signup.errors.email
        &&signup.touched.passwordCheck && !signup.errors.passwordCheck)
    const navigate = useNavigate();


    return(
        <S.Container>
            <h2>회원가입</h2>
            <S.FormComponent>
                <S.InputComponent error = {signup.touched.email&& signup.errors.email}
                 type={'email'}{...signup.getTextInputProps('email')} placeholder="이메일을 입력해주세요!"/>    
                {signup.touched.email && signup.errors.email && <S.ErrorText>{signup.errors.email}</S.ErrorText> }
                <S.InputComponent error = {signup.touched.password && signup.errors.password}
                 type={'password'}{...signup.getTextInputProps('password')} placeholder="비밀번호를 입력해주세요!" />
                {signup.touched.password && signup.errors.password && <S.ErrorText>{signup.errors.password}</S.ErrorText> }
                <S.InputComponent error = {signup.touched.passwordCheck && signup.errors.passwordCheck}
                  type={'password'}{...signup.getTextInputProps('passwordCheck')} placeholder="비밀번호를 입력해주세요!" />
                {signup.touched.passwordCheck && signup.errors.passwordCheck && <S.ErrorText>{signup.errors.passwordCheck}</S.ErrorText> }
                
                <S.SubmitButton type={'submit'} disabled = {isDisabled} onClick={()=> navigate('/login')}>제출</S.SubmitButton>
                
            </S.FormComponent>
        </S.Container>
        
    )
}

export default SignupPage;