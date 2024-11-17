import { axiosInstance } from "../../apis/axios-instance";
import { useQuery } from "@tanstack/react-query";

const useGetDetail = async ({movieId})=>{
    const {data} = await axiosInstance.get(`/movie/${movieId}?language=ko-KR`)
    return data;
}
const useDetailQuery = (movieId)=>{ 
    const {data, isFetching, isError} = useQuery({
        queryFn : ()=> useGetDetail({movieId}),
        queryKey : ['detail',movieId],
        cacheTime: 10000,
        staleTime : 10000,
    })
    return {data, isFetching,isError}
}
export {useDetailQuery};

