import { axiosInstance } from "../../apis/axios-instance";

const useGetMovies = async ({category, pageParam})=>{
    console.log("category");
    console.log(category);
    console.log(pageParam);
    const {data} = await axiosInstance.get(`/movie/${category}?language=ko-KR&page=${pageParam}`)
   
    return data;
}

export {useGetMovies};
