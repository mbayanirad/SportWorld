import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import styled from "styled-components";
import Header from "./components/Header";
import Home from "./components/Routes/Home";
import SignIn from "./components/SignIn";
import GlobalStyles from "./components/GlobalStyles"
import EventDetails from "./components/Routes/Groups/Event/EventDetails";
import Groups from "./components/Routes/Groups";
import GroupDetails from "./components/Routes/Groups/GroupDetails";


function App() {
  return (
  <Container>
    <GlobalStyles />
    <Router>
    <Header/>
      <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/groups" element={<Groups/>}/>
        <Route path="/groupdetails" element={<GroupDetails/>}/>
        <Route path="/eventDetails" element={<EventDetails/>}/>
      </Routes>
    </Router>
  </Container>);
}
const Container = styled.div`
`

export default App;
