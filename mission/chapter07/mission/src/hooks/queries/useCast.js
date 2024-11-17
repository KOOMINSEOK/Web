import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios-instance";

const useGetCast = async ({movieId})=>{
    const {data} = await axiosInstance.get(`/movie/${movieId}/credits?language=ko-KR`)
    return data;
}

export const useCastQuery = (movieId)=>{
    const {data, isFetching, isError} = useQuery({
        queryFn: ()=> useGetCast({movieId}),
        queryKey: ['cast',movieId],
        cacheTime: 10000,
        staleTime : 10000,
    })
    return {data, isFetching, isError}
}