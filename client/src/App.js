import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import styled from "styled-components";
import Header from "./components/Header";
import Home from "./components/Routes/Home";
import Singin from "./components/Singin";
import GlobalStyles from "./components/GlobalStyles"
import EventDetails from "./components/Routes/Home/EventDetails";


function App() {
  return (
  <Container>
    <GlobalStyles />
    <Header/>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Singin/>}/>
        <Route path="/eventDetails" element={<EventDetails/>}/>
        {/* <Route path="/" element={<Home/>}/> */}
        {/* <Route path="/" element={<Home/>}/> */}

      </Routes>
    </Router>
  </Container>);
}
const Container = styled.div`
`

export default App;
