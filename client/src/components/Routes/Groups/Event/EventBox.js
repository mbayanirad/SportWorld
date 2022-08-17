import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../../../Contexts/UserContext";
import { NavLink } from "react-router-dom";
import { GroupsContext } from "../../../Contexts/GroupsContext";

const EventBox = ({event}) => {
    const {actions:{setCurrentEvent}} = useContext(GroupsContext)
    const url =
    `https://res.cloudinary.com/doc7plec9/image/upload/${event.imgs[0]}.jpg`.replace(
      '"',
      ""
    );
    //check whether event time is done or not
    const checkDate =  new Date(event.startDate).getTime() - new Date().getTime() > 0
        ? true
        : false;
    return (
        <BoxWrapper to= "/eventDetails" onClick={()=>setCurrentEvent(event)}
        style={{opacity:checkDate?"1":"0.5"}} disabled={!checkDate && true} > 
            <Img src = {url}/>
            <Info >Subject: {event.subject}</Info>
            <Info>startDate: {event.startDate.substring(0,10)} </Info>
            <Info>endDate: {event.endDate.substring(0,10)} </Info>
            <Info>startpoint: {event.startpoint.address} </Info>
            <Info>Number of participants: {event.participants} </Info>
            <Info>description: {event.description} </Info>
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
export default EventBox;