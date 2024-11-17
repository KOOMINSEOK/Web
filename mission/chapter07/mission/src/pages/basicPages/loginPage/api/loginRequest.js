import { getUserInfo, serverRequest } from "../../../../apis/axios-umcServer";


const LoginRequest = (data) =>{
    const {email, password} = data;
    const bodyData = {
        "email": email,
        "password": password,
    }
    const loginResponse = serverRequest(
        '/auth/login',
        "POST",
        bodyData
    );
    const {refreshToken, accessToken} = loginResponse.data;
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("accessToken", accessToken);

}

export default LoginRequest;