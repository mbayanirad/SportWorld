import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import styled from "styled-components";
import Home from "./Routes/Home";
function App() {
  return (
  <Container>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        {/* <Route path="/" element={<Home/>}/> */}
        {/* <Route path="/" element={<Home/>}/> */}

      </Routes>
    </Router>
  </Container>);
}
const Container = styled.div`
`

export default App;
