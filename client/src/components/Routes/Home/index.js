import { useContext, useEffect } from "react";
import styled from "styled-components";
import { GroupsContext } from "../../Contexts/GroupsContext";
import { PostContext } from "../../Contexts/PostContext";
import { UserContext } from "../../Contexts/UserContext";
import AllPosts from "./AllPosts";
import Banner from "./Banner";
import NewPost from "./NewPost";

const Home = () => {
  const {state,actions:{getAllUserInfo}} = useContext(UserContext);
  const {state:{allPosts},actions:{getAllPosts, updatePostLike}} = useContext(PostContext);
  const {state:{groups},actions:{getAllGroups}} = useContext(GroupsContext);
 useEffect(() => {
  getAllPosts();
  getAllGroups();
  getAllUserInfo();
 }, []);
  if(state.logInUserId === null || allPosts.length === 0  || groups.length === 0) return <div>Loading ...</div>;
  else{
    console.log("allpostinside home",allPosts)
    return (
      <>
      <Banner />
      <NewPost userId = {state.logInUserId}/>
      <AllPosts allPosts = {allPosts} action = {updatePostLike}/>
      
    </>
  );
}
};
export default Home;
