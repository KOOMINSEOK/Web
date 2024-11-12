import useForm  from "../../../hooks/useForm.js";
import * as S from '../styled/styled.js';
import {validateLogin} from "../../../utils/validate";
import { useNavigate  } from "react-router-dom";

const LoginPage = ()=>{
    const login = useForm({
        initialValue:{
            email: '',
            password: '',
        },
        validate: validateLogin
    })
    const isDisabled  = !(login.touched.password && !login.errors.password &&login.touched.email && !login.errors.email);
    const navigate = useNavigate();
    return(
        <S.Container>
            <h2>로그인</h2> 
            <S.FormComponent>    
                <S.InputComponent error = {login.touched.email&& login.errors.email}
                 type={'email'}{...login.getTextInputProps('email')} placeholder="이메일을 입력해주세요!"/>    
                {login.touched.email && login.errors.email && <S.ErrorText>{login.errors.email}</S.ErrorText> }
                <S.InputComponent error = {login.touched.password && login.errors.password}
                 type={'password'}{...login.getTextInputProps('password')} placeholder="비밀번호를 입력해주세요!" />
                {login.touched.password && login.errors.password && <S.ErrorText>{login.errors.password}</S.ErrorText> }
                <S.SubmitButton type={'submit'} disabled = {isDisabled} onClick={()=> navigate('/')}>제출</S.SubmitButton>
            </S.FormComponent>
        </S.Container>
        
    )
}

export default LoginPage;