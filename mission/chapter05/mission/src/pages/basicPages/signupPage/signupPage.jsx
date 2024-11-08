import useForm  from "../../../hooks/useForm.js";
import './signupPage.css';
import { validateSignup} from "../../../utils/validate.js";

const SignupPage = ()=>{
    const login = useForm({
        initialValue:{
            email: '',
            password: '',
            passwordCheck: '',
        },
        validate: validateSignup
    })
    return(
        <div className="login_form_container">
            <h2>로그인</h2>     
            <form className="login_form" >
            <input className = {`${(login.touched.email && login.errors.email) ? 'error' : 'nonerror'}`}
            type={'email'}{...login.getTextInputProps('email')} placeholder="이메일을 입력해주세요!" />
            {login.touched.email && login.errors.email && <p style={{color: 'red'}}>{login.errors.email}</p> }
            <input className = {`${(login.touched.password && login.errors.password) ? 'error' : ''}`}
            type={'password'}{...login.getTextInputProps('password')} placeholder="비밀번호를 입력해주세요!" />
            {login.touched.password && login.errors.password && <p style={{color: 'red'}}>{login.errors.password}</p>}
            <input className = {`${(login.touched.passwordCheck && login.errors.passwordCheck) ? 'error' : ''}`}
            type={'password'}{...login.getTextInputProps('passwordCheck')} placeholder="비밀번호를 입력해주세요!" />
            {login.touched.passwordCheck && login.errors.passwordCheck && <p style={{color: 'red'}}>{login.errors.passwordCheck}</p>}
            {(login.touched.password && !login.errors.password &&login.touched.email && !login.errors.email
                &&login.touched.passwordCheck && !login.errors.passwordCheck)
            ?<input type={'submit'} value="로그인" className="submit" />
             :<input type={'submit'} value="로그인" className="submit gray" disabled/>}
            
            </form>
        </div>
        
    )
}

export default SignupPage;