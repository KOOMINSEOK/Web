import CastFrame from "./castFrame";
import * as S from './styled/styled.js';
const CastFrameList = ({number}) => {
    return(
        <S.CastList>
            {new Array(number).fill(0).map((_,idx)=> <CastFrame/>)}
        </S.CastList>
    )
}

export default CastFrameList;