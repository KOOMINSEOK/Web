import styled from "styled-components";
import { Link } from "react-router-dom";
import searchIcon from "./icon/search.png"
import movieIcon from "./icon/movie.png"
import "./sidebar.css"
const SideBar = () => {
    return (
        <SideBarContainer>
            <ul className = "sidebar" >
                <Link to={'/search'}><li><img src={searchIcon} width={20} height={20}/>찾기</li></Link>
                <Link to={'/movies'}><li><img src={movieIcon} width={20} height={20}/>영화</li></Link>
            </ul>
        </SideBarContainer>
    );
};

export default SideBar;

const SideBarContainer = styled.div`
    dispaly: flex;
    height: 100vh;
    background-color: #1b1b1b;
    width: 15%;
   
`
