import { useEffect, useState } from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";
import {
  AiFillNotification,
  AiFillCaretLeft,
  AiFillCaretRight,
} from "react-icons/ai";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { GroupsContext } from "../../Contexts/GroupsContext";
const Banner = ({ groups }) => {
  //read user data from userContext
  const { state } = useContext(UserContext);
  const {
    actions: { updateEventParticipant,setCurrentEvent },
  } = useContext(GroupsContext);
  //set a event from groups announcments for show in banner
  const [event, setEvent] = useState({});
  //check user already particapated in event or not
  // let participated = false;
  const [participated, setParticipated] = useState(false);
  //add event from group annuncement to show user
  const readEvent = async (groupIndex, eventindex) => {
    if (groups.length > 0) {
      setEvent({
        groupId: groups[groupIndex]._id,
        activityType: groups[groupIndex].activityType,
        name: groups[groupIndex].name,
        ...groups[groupIndex].annuncements[eventindex],
        imgUrl:`https://res.cloudinary.com/doc7plec9/image/upload/${groups[groupIndex].annuncements[eventindex].imgs[0]}.jpg`.replace('"',"")
        
      });
      console.log(event);
      //detecte current user already is in this event or no
      const check = await groups[groupIndex].annuncements[
        eventindex
      ].participants.includes(`${state._id}`);
      setParticipated(check);
    }
  };
  //----------------------------------------------------
  let groupIndex = 0; // use of this index for change group
  let eventindex = 0; // use of this index for change event in each group
  useEffect(() => {
    //first time load event
    readEvent(groupIndex, eventindex);
    //interval event load per 10 sc
    const entervalId = setInterval(() => {
      if (groupIndex < groups.length - 1) groupIndex += 1;
      else groupIndex = 0;
      if (eventindex < groups[groupIndex].annuncements.length - 1)
        eventindex += 1;
      else eventindex = 0;
      readEvent(groupIndex, eventindex);
    }, 10000);
    return () => {
      clearInterval(entervalId);
    };
  }, []);

  // previous click handle show perv event
  const handlePrev = async () => {
    if ((await parseInt(groupIndex)) > 0) groupIndex -= 1;

    if ((await eventindex) > 0) eventindex -= 1;

    readEvent(groupIndex, eventindex);
  };

  // next click handle show next event
  const handleNext = async () => {
    if ((await parseInt(groupIndex)) < groups.length - 1) groupIndex += 1;
    if ((await eventindex) < groups[groupIndex].annuncements.length - 1)
      eventindex += 1;
    readEvent(groupIndex, eventindex);
  };

  //update goups event participant by this user id
  const handleParticipate = async(groupId, eventId, userId,method) => {
    const result = await updateEventParticipant({
      groupId: groupId,
      eventId: eventId,
      userId: userId,
      method: method,
    });
    console.log("result part is",result);
    if (result && method === "pull")
      setParticipated(false);
    else if(result && method === "push")
      setParticipated(true);    
  };
  const hadleEventDetails = (event) => {
    setCurrentEvent(event)
  }
  if (event === {}) return <div>loading ...</div>;
  return (
    <>
      {event.imgs && (
        <Container>
          <div style={{ height: "100%", margin: "0 30px" }}>
            <AiFillNotification
              size={30}
              fill="white"
              style={{
                margin: "20px 30px",
                position: "absolute",
                bottom: "230px",
                left: "0px",
              }}
            />
            <AiFillCaretLeft size={30} onClick={() => handlePrev()} />
          </div>
          <EventWrapper 
            onClick={()=> hadleEventDetails(event)}
            to = '/eventDetails'>
              <Img src = {event.imgUrl}/>
            <Info>
              <P>Group Name: {event.name}</P>
              <P>Activity Type: {event.activityType}</P>
              <P>Evet Description: {event.description}</P>
              <P>Time: {event.startDate}</P>
              <P>Start point: {event.startpoint.address}</P>
              {/* <P>Path: {}</P> */}
            </Info>
          </EventWrapper>
          <AiFillCaretRight
            size={30}
            style={{ margin: "0 30px" }}
            onClick={() => handleNext()}
          />

          {!participated ? (
            <Joined onClick={() => 
              handleParticipate(
                event.groupId,
                event.id,
                state._id,
                "push"
              )}>Join</Joined>
          ) : (
            <DisJoined onClick={() =>
            
              handleParticipate(
                event.groupId,
                event.id,
                state._id,
                "pull"
              )}>Left</DisJoined>
          )}
        </Container>
      )}
    </>
  );
};

const Img = styled.img`
  width: 100%;
  max-height: 300px;
  min-width: 620px;
  height: auto;
  object-fit: cover;
  object-position: center;
  border-radius: 5px;
`

const Container = styled.div`
  border: 3px outset  lightgray;  
  position: relative;
  display: flex;
  background: lightblue; 
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  margin-right: 15px;
  align-items: center;
  justify-content: space-between;
  min-height: 100%;
  /* max-height: 100%; */
`;
const EventWrapper = styled(NavLink)`
  text-decoration: none;
  display: flex;
  display: flex;
  height: auto;
  /* min-height: 45%; */
  max-height: 320;
  /* padding: 0 30px; */
`;
const Info = styled.div`
  margin: 30px 30px;
`;

const P = styled.p`
  font-weight: bold;
  font-size: 1em;
  margin: 20px 0;
  max-height: fit-content;
  /* color: white; */
`;
const DisJoined = styled.button`
  color: white;
  font-weight: bold;
  font-size:1.2em;
  border: none;
  width: 150px;
  height: 30px;
  border-radius: 5px;
  margin: 10px 0;
  position: absolute;
  left: 80%;
  top: 80%;
  background: #953e4d;
  &:hover {
    background: #904371;
  }
`;

const Joined = styled(DisJoined)`
  color: white;
  background: #15be89;
  &:hover {
    background: #00d3d1;
  }
`;
export default Banner;
