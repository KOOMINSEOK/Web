import useForm  from "../../../hooks/useForm.js";
import { validateSignup} from "../../../utils/validate.js";
import * as S from './styled/styled.js'

const SignupPage = ()=>{
    const signup = useForm({
        initialValue:{
            email: '',
            password: '',
            passwordCheck: '',
        },
        validate: validateSignup
    })
    const isDisabled = !(signup.touched.password && !signup.errors.password &&signup.touched.email && !signup.errors.email
        &&signup.touched.passwordCheck && !signup.errors.passwordCheck)
    return(
        <S.Container>
            <h2>회원가입</h2>
            <S.SignupForm>
                <S.SignupInput error = {signup.touched.email&& signup.errors.email}
                 type={'email'}{...signup.getTextInputProps('email')} placeholder="이메일을 입력해주세요!"/>    
                {signup.touched.email && signup.errors.email && <S.ErrorText>{signup.errors.email}</S.ErrorText> }
                <S.SignupInput error = {signup.touched.password && signup.errors.password}
                 type={'password'}{...signup.getTextInputProps('password')} placeholder="비밀번호를 입력해주세요!" />
                {signup.touched.password && signup.errors.password && <S.ErrorText>{signup.errors.password}</S.ErrorText> }
                <S.SignupInput error = {signup.touched.passwordCheck && signup.errors.passwordCheck}
                  type={'password'}{...signup.getTextInputProps('passwordCheck')} placeholder="비밀번호를 입력해주세요!" />
                {signup.touched.passwordCheck && signup.errors.passwordCheck && <S.ErrorText>{signup.errors.passwordCheck}</S.ErrorText> }
                <S.SubmitButton type={'submit'} disabled = {isDisabled}>제출</S.SubmitButton>
            </S.SignupForm>
        </S.Container>
        
    )
}

export default SignupPage;