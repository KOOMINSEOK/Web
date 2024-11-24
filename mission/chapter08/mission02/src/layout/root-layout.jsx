import {Link, Outlet} from "react-router-dom";
import * as S from './styled/styled'
const RootLayout =()=>{
    return (
        <S.Container>
            <Link to={"/"}>
                <S.Title>⚡ UMC ToDoList ⚡</S.Title>
            </Link>
            <Outlet/>
        </S.Container>
    );
}

export default RootLayout;