import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../Contexts/UserContext";
import Banner from "./Banner";
import Post from "./Post";

const Home = () => {
  const {state} = useContext(UserContext);
  if(state.logInUserId === null) return <div>logIn ...</div>
  return (
    <>
      <Banner />
      <Post userId = {state.logInUserId}/>
    </>
  );
};
export default Home;
