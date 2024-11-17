import axios from 'axios';


const axiosOption = (url, method, bodyData) =>{
    const option = {
        url : import.meta.env.VITE_SERVER_BASE_URL+url,
        method : method,
        headers:{
            "Content-Type": "application/json",
        },
        data : bodyData
    }
    return option;
}
export const serverRequest = async (url, method, bodyData) =>{
    try {
        const response = await axios(axiosOption(url, method, bodyData));
        return response.data;
      } catch (error) {
        console.error("request failed:", error);
        throw error;
      }
}

export const getUserInfo = () =>{
    try{
        const accessToken = localStorage.getItem('accessToken');
        if(!accessToken){
            console.log("Access token is wrong");
            return;
        }
        const userInfo = serverRequest(
            '/user/me',
            "GET",
        );
        const id = userInfo.data.id;
        const email = userInfo.data.email;
        const nickname = email.split('@')[0];
    }
    catch(error){
        console.error("failed to get user info: ", error);
    }
    return {id,nickname}
}

export const logOut = ()=>{
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if(accessToken && refreshToken){
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
}