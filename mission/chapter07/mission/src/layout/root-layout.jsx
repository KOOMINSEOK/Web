import {Outlet} from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import SideBar from "../components/sidebar/sidebar";
import styled from "styled-components";


const RootLayout = () => {
    return (
        <PageContainer>
                <Navbar/>
                <BoxLayout>
                    <SideBar/>
                    <OutletContainer>
                        <Outlet/>
                    </OutletContainer>
                </BoxLayout>
        </PageContainer>
    );
};

export default RootLayout;

const PageContainer = styled.div`
    background-color: #111;
    min-height: calc(100vh - 100px);
`

const BoxLayout = styled.div`
    display: flex;
    flex-direction : row;
    width: 100vw;
    background-color: #111;
    color: white;
`
const OutletContainer = styled.div`
    background-color: #111;
    padding: 20px 20px 20px 20px;
    width: 100%;
`