import styled from "styled-components";
import Map from "../../Map";
import Upload from "../../Cloudinary/Upload";
import { useEffect } from "react";
import Banner from "./Banner";
import { useContext } from "react";
import { GroupsContext } from "../../Contexts/GroupsContext";
const Home = () => {
    const {state:{groups}} = useContext(GroupsContext);
    return (
        <Wrapper>
            <Events>
               {groups.length > 0 && <Banner groups = {groups}/>}
                {/* <Upload/> */}
            </Events>

            {/* <Map width={1000} height={600}  setDistination={true} /> */}
        </Wrapper>
    )
}
const Wrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display:flex;
    flex-direction: column;
    justify-content: center;
    justify-items: center;
    /* text-align: center; */
    align-items: center;
`

const Events  =styled.div`
    width: 100%;
    height: 100%;
`

export default Home;