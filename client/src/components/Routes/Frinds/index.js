import { useContext } from "react";
import styled from "styled-components";
import { PostContext } from "../../Contexts/PostContext";
import { UserContext } from "../../Contexts/UserContext";
import FriendBox from "./FriendBox"

const Friends = () => {
  const {
    actions:{updateFriends},
    state: { logInUserId, logInUserInfo, allUserInfo },
  } = useContext(UserContext);
  const {actions:{
    updatePostUserInfoFriends}} = useContext(PostContext);
    //handle friends request
    const handleFriendsRequest = async (method, userId) => {
        const result = await updateFriends({
          userId: userId,
          loginUserId: logInUserId,
          method: method
        })
        if (result){
         await 
         updatePostUserInfoFriends({
            userId: userId,
            loginUserId: logInUserId,
            method: method
          })
        }
    
      }

  return (
    <>
      <Container>
        My Friends
        <MyFriends>
          {logInUserInfo.friends
            .map((userId) => {
              return (
                <UserWrapper>
                  <FriendBox userId={userId} />
                  <BtnUnFr onClick={() => handleFriendsRequest("pull",userId)}>Unfriend</BtnUnFr>

                </UserWrapper>
              );
            })}
        </MyFriends>
        {allUserInfo.filter((user) => !(user.friends.includes(logInUserId)) &&
            user._id !== logInUserId ).length >
          0 && (
          <>
            <Divider />
            Suggestion Friends
            <SuggestionFriens>
              {allUserInfo
                .filter((user) => !user.friends.includes(logInUserId) &&
                user._id !== logInUserId )
                .map((user) => {
                  return (
                    <UserWrapper>
                      <FriendBox userId={user._id} />
                      <Btn onClick={() => handleFriendsRequest("push",user._id)}>friend request</Btn>
                    </UserWrapper>
                  );
                })}
            </SuggestionFriens>
          </>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 20px;
  width: 100%;
  height: 100%;
`;
const MyFriends = styled.div`
  margin: 20px 20px;
  display: flex;
  width: 100%;
  height: 50%;
`;
const SuggestionFriens = styled(MyFriends)``;

const Divider = styled.div`
  border: 1px solid lightgray;
  margin-bottom: 20px;
`;

const UserWrapper = styled.div`
  min-height: 100%;
  min-width: 20%;
  border: 1px solid gray;
  border-radius: 10px;
  margin-right: 10px;
`;

const Btn = styled.button`
  background: #15be89;
  color: white;
  border: none;
  width: 150px;
  height: 30px;
  border-radius: 5px;
  margin: 10px 0;
  margin-left: 65px;
  &:hover {
    background: #99be62;
  }
`;
const BtnUnFr = styled(Btn)`
  background: #930c0e;
  &:hover {
    background: #ff5929;
  }
`

export default Friends;
