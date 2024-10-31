import CastCard from "../../../components/castCard/castCard";
import DetailCard from "../../../components/detailCard/detailCard";
import useCustomFetch from "../../../hooks/useCustomFetch";
import './detailPage.css'
const DetailPage = (props)=>{
    const {movieId} = props;
    const {data : detail, isDetailLoading, isDetailError} = useCustomFetch(`/movie/${movieId}?language=ko-KR'`);
    const {data : movie, isCastLoading, isCastError} = useCustomFetch(`/movie/${movieId}/credits?language=ko-KR`);
    if(isDetailLoading || isCastLoading){
        return<div><h1 style={{color: 'white'}}>로딩중 입니다...</h1></div>
    }
    if(isDetailError || isCastError){
        return<div><h1 style={{color: 'white'}}>에러 발생</h1></div>
    }
    return(
        <>  
            <div className="entire_box">
                <DetailCard detail = {detail.data}/>
                <div className="casting">
                    <h2>감독/출연</h2>
                    <div className="cast_list">
                        {movie.data?.cast.map((cast)=>(
                            <CastCard cast = {cast}/>
                        ))}
                    </div> 
                </div>
            </div>
        </>
    )
}

export default DetailPage;