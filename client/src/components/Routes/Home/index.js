import styled from "styled-components";
import Map from "../../Map";
const Home = () => {

    return (
        <div style={{height:"90vh",width:"90vw"}}>
            <Events>
                
            </Events>

            {/* <Map width={1000} height={600}  setDistination={true} /> */}
        </div>
    )
}

const Events  =styled.div`
    width: 100%;
`

export default Home;