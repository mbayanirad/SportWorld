import { useContext } from "react";
import styled from "styled-components";
import { GroupsContext } from "../../Contexts/GroupsContext";
import { UserContext } from "../../Contexts/UserContext";
import FriendBox from "../Frinds/FriendBox";
import EventBox from "./Event/EventBox";

const GroupDetails = () => {
  const {
    state: { selectedGroupId, groups },
  } = useContext(GroupsContext);
  const {
    state: { allUserInfo, logInUserInfo, logInUserId },
  } = useContext(UserContext);
  const selelctedGroup =
    groups.find((group) => group._id === selectedGroupId) || null;
  if (selelctedGroup === null) return <div>Loading ...</div>;
  const url =
    `https://res.cloudinary.com/doc7plec9/image/upload/${selelctedGroup.banner}.jpg`.replace(
      '"',
      ""
    );
  return (
    <Container>
      <Banner>
        <Img src={url} />
        <Info>
          <Name>{selelctedGroup.name}</Name>
          {selelctedGroup.owner === logInUserId && (
            <NewEvent>New event</NewEvent>
          )}
          <Memebers>Number of Members {selelctedGroup.members.length}</Memebers>
        </Info>
      </Banner>
      <Body>
        {selelctedGroup.annuncements.length > 0 && (
          <>
            Events
            <Events>
              {selelctedGroup.annuncements.map((annuncement) => {
                return (
                <EventWrapper>
                    <EventBox event={annuncement}/>
                </EventWrapper>);
              })}
            </Events>
          </>
        )}
        {selelctedGroup.members.length > 0 && (
          <>
            <Divider />
            Members
            <Members>
              {selelctedGroup.members.map(userId => {
                return(
                  <MemberWrapper>
                    <FriendBox userId ={userId}/>
                  </MemberWrapper>)
                })
              
              }
            </Members>
            {/* FriendBox */}
          </>
        )}
      </Body>
    </Container>
  );
};
const Divider = styled.div`
  border: 1px solid lightgray;
  margin-bottom: 20px;
`;
const Body = styled.div``;
const Members = styled.div`
  margin: 20px 20px;
  display: flex;
  width: 100%;
  height: 50%;
`;
const MemberWrapper = styled.div`
  min-height: 100%;
  min-width: 20%;
  border: 1px solid gray;
  border-radius: 10px;
  margin-right: 10px;
`;
const Events = styled.div`
  margin: 20px 20px;
  display: flex;
  width: 100%;
  height: 50%;
`;
const EventWrapper = styled.div`
  min-height: 100%;
  max-width: 25%;
  border: 1px solid gray;
  border-radius: 10px;
  margin-right: 10px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const Banner = styled.div`
  max-height: 300%;
  position: relative;
  width: 100%;
`;
const Img = styled.img`
  width: 100%;
  object-fit: cover;
  object-position: center;
  wrapper-sizing: border-Wrapper;
  height: 300px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
`;
const Info = styled.div`
  display: flex;
  justify-content: space-around;

  position: absolute;
  background: white;
  opacity: 0.8;
  top: 82%;
  width: 99.2%;
  border-top-right-radius: 4px;
  padding: 6px;
`;
const Name = styled.div`
  font-size: 2em;
  padding-left: 10px;
`;
const Memebers = styled.div`
  font-size: 1.5em;
  padding-left: 10px;
`;
const NewEvent = styled.button`
  color: white;
  border: none;
  font-weight: bold;
  font-size: 1.2em;
  font-family: "Times New Roman", Times, serif;
  border-radius: 50px;
  width: 33%;
  background: #15be89;
  &:hover {
    background: #00d3d1;
  }
`;

export default GroupDetails;
