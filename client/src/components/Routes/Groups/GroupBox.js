import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { NavLink } from "react-router-dom";
import { GroupsContext } from "../../Contexts/GroupsContext";

const GroupBox = ({group}) => {
    const {state:{allUserInfo}} = useContext(UserContext);
    const {actions:{setSelectedGroup}} = useContext(GroupsContext);
    const url = `https://res.cloudinary.com/doc7plec9/image/upload/${group.banner}.jpg`
    const newurl = url.replace('"',"");
    const ownerIInfo = allUserInfo.find(user => user._id === group.owner);
    return (
        <BoxWrapper to= "/groupdetails" onClick={()=>setSelectedGroup(group._id)}> 
            <Img src = {newurl}/>
            <Info>Group name: {group.name}</Info>
            <Info>Group owner: {ownerIInfo.firstName} {ownerIInfo.lastName}</Info>
            <Info>Stablish date: {(group.establishDate.substring(0,10))}</Info>
            <Info>Member number: {group.members.length}</Info>
        </BoxWrapper>)
}

const BoxWrapper = styled(NavLink)`
  text-decoration: none;
  color: black;
`
const Info = styled.div`
  opacity: .7;
  margin: 7px 10px;
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
export default GroupBox;