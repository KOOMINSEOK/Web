import {Outlet} from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import SideBar from "../components/sidebar/sidebar";
import styled from "styled-components";


const RootLayout = () => {
    return (
        <>
           
            <Navbar/>
            <BoxLayout>
               <SideBar/>
                <Outlet/>
            </BoxLayout>
   
        </>
    );
};

export default RootLayout;

const BoxLayout = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    background-color: #111;
    color: white;
`