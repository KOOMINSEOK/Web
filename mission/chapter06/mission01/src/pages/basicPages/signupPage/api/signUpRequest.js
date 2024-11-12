import { serverRequest } from "../../../../apis/axios-umcServer";


const signUpRequest = (data) =>{
    const {email, password, passwordCheck} = data;
    const bodyData = {
        "email": email,
        "password": password,
        "passwordCheck": passwordCheck,
    }
    const signUp = serverRequest(
        '/auth/register',
        "POST",
        bodyData
    );

    return signUp
}

export default signUpRequest;