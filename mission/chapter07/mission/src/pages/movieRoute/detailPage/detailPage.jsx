import CastCard from "../../../components/castCard/castCard";
import DetailCard from "../../../components/detailCard/detailCard";
import useCustomFetch from "../../../hooks/useCustomFetch";
import * as S from './styled/styled.js';
import { useDetailQuery} from '../../../hooks/queries/useDetail.js'
import { useCastQuery } from "../../../hooks/queries/useCast.js";
import DetailFrame from "../../../components/detailFrame/detailFrame.jsx";
import CastFrameList from "../../../components/castFrame/castFrameList.jsx";
const DetailPage = (props)=>{
    const {movieId} = props;
    const { data : detail, isFetching: isDetailFetching, isError : isDetailError} = useDetailQuery(movieId);
    const {data : casting, isFetching: isCastFetching, isError : isCastError} = useCastQuery(movieId);
    if( isDetailFetching || isCastFetching){
        return (
            <>
                <DetailFrame/>
                <CastFrameList number = {20}/>
            </>
        )
    }
    if(isDetailError || isCastError){
        return<div><h1 style={{color: 'white'}}>에러 발생</h1></div>
    }
    return(
        <>  
            <S.Container>
                <DetailCard detail = {detail}/>
                <S.CastingBox>
                    <h2>감독/출연</h2>
                    <S.CastList>
                        {casting?.cast.map((cast)=>(
                            <CastCard cast = {cast}/>
                        ))}
                    </S.CastList> 
                </S.CastingBox>
            </S.Container>
        </>
    )
}

export default DetailPage;