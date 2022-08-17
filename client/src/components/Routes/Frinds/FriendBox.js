import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { NavLink } from "react-router-dom";

const FriendBox = ({userId}) => {
    const {state:{allUserInfo}} = useContext(UserContext)
    const friend = allUserInfo.find( user => user._id === userId) || null;
    if (friend === null) return <div> Loading ...</div>
    const url =
    `https://res.cloudinary.com/doc7plec9/image/upload/${friend.imgSrc}.jpg`.replace(
      '"',
      ""
    );
    return (
        <BoxWrapper to= "/eventDetails"> 
            <Img src = {url}/>
            <Info>Name: {friend.firstName} {friend.lastName}</Info>
            <Info>userId: {friend.userId} </Info>
            <Info>number of myGroups: {friend.myGroups.length} </Info>
            <Info>Number of followers: {friend.followerIds.length} </Info>
            <Info>Number of Subescribe Groups: {friend.registeredGroups.length} </Info>
        </BoxWrapper>)
}

const BoxWrapper = styled(NavLink)`
  text-decoration: none;
  color: black;
`
const Info = styled.div`
  opacity: .7;
  margin: 7px 10px;
  word-wrap: break-word;
`
const Img = styled.img`
  width: 100%;
  object-fit: cover;
  object-position: center;
  box-sizing: border-box;
  height: 140px;
  border: 3px inset lightgray;
  /* margin: 0 10px; */
  /* border-radius: 7px; */
  border-top-right-radius: 7px;
  border-top-left-radius: 7px;


`
export default FriendBox;