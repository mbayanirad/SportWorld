import { Image, Transformation } from "cloudinary-react";
import { useContext } from "react";
import styled from "styled-components";
import { AiFillLike } from "react-icons/ai";
import { MdOutlineInsertComment } from "react-icons/md";
import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri";
import { GroupsContext } from "../../../Contexts/GroupsContext";
import { UserContext } from "../../../Contexts/UserContext";
import { FaUserFriends } from "react-icons/fa";
import { PostContext } from "../../../Contexts/PostContext";
const Post = ({ post, action }) => {
  const {
    actions:{updateUserFollow, updateFriends},
    state: { logInUserId},
  } = useContext(UserContext);
  const {actions:{
    updatePostUserInfoFollow,
    updatePostUserInfoFriends}} = useContext(PostContext);
  const {
    state: { groups },
  } = useContext(GroupsContext);
  console.log("post is", post);
  const handleLike = async () => {
    await action({
      postId: post._id,
      userId: logInUserId,
      method: post.likeBy.includes(logInUserId) ? "pull" : "push",
    });
  };
  //get city and country from address
  const splitAddress = post.userInfo.position.address.split(",");
  const city = splitAddress[splitAddress.length - 3];
  const country = splitAddress[splitAddress.length - 1];
  
const friendOfLoginUser = post.userInfo.friends.includes(logInUserId);

  //calculate how long this post submited
  const miunts = new Date().getMinutes() - new Date(post.timeStamp).getMinutes(); 
  const hours = new Date().getHours() - new Date(post.timeStamp).getHours();
  const days = new Date().getDate() - new Date(post.timeStamp).getDate();
  const months = new Date().getMonth() - new Date(post.timeStamp).getMonth();
  const years = new Date().getFullYear() - new Date(post.timeStamp).getFullYear();
  let time = null;
  if(years > 0)
    time = `${years} y ago`;
  else if(months > 0)
  time = `${months} m ago`;
  else if(days > 0)
  time = `${days} d ago`;
  else if(hours > 0)
  time = `${hours} h ago`;
  else if(miunts > 0)
  time = ` ${miunts} m ago`;

  // console.log(diffrence);
  // if(diffrence < 24)  diffrence = `${diffrence} h`;
  // if (diffrence >= 24) diffrence = `${diffrence / 24} d ${diffrence % 24} h`;
  // if (diffrence > 24 * 30)
  //   diffrence = `${(diffrence / 24) * 30} m ${(diffrence % (24 * 30)) / 24} d ${
  //     (diffrence % (24 * 30)) % 24
  //   }`;
  //-----------updateFollow---------------------
  const handleUnfollow = async () => {
    const result = await updateUserFollow({
      userId: post.userInfo._id,
      loginUserId: logInUserId,
      method: "pull"
    })
    if (result){
     await 
     updatePostUserInfoFollow({
        userId: post.userInfo._id,
        loginUserId: logInUserId,
        postId: post._id,
        method: "pull"
      })
    }

  }
  const handleFollow = async () => {
    const result = await updateUserFollow({
      userId: post.userInfo._id,
      loginUserId: logInUserId,
      method: "push"
    })
    if (result){
     await
      
     updatePostUserInfoFollow({
        userId: post.userInfo._id,
        loginUserId: logInUserId,
        postId: post._id,
        method: "push"
      })
    }
  }
  //handle friends request
  const handleFriendsRequest = async (method) => {
    const result = await updateFriends({
      userId: post.userInfo._id,
      loginUserId: logInUserId,
      method: method
    })
    if (result){
     await 
     updatePostUserInfoFriends({
        userId: post.userInfo._id,
        loginUserId: logInUserId,
        method: method
      })
    }

  }

  if (!post.userInfo?.imgSrc) <div>loading...</div>;
  return (
    <Container>
      <UserInfo>
        <Avatar>
          <Image cloudName="doc7plec9" publicId={post.userInfo.imgSrc}>
            <Transformation
              rawTransformation="h_60,w_60,c_fill,r_2"
              radius="50"
              // crop="crop"
              loading="lazy"
              background="white"
              y="60"
              x="80"
            />
          </Image>
        </Avatar>
        <UserDetails>
          <Name>
            {post.userInfo.firstName} {post.userInfo.lastName} Live in {city},
            {country}
          </Name>
          <TimeStamp>
             {time !== null && time } , Numer of followers{" "}
            {post.userInfo.followerIds.length}
          </TimeStamp>
          {post.userInfo.myGroups.length > 0 && (
            <GroupsOwner>
              Owner of Groups:
              {post.userInfo.myGroups.map((group) => {
                return (
                  <> {groups.find((groupe) => groupe._id === group).name}, </>
                );
              })}
            </GroupsOwner>
          )}
          {post.userInfo.registeredGroups.length > 0 && (
            <GroupsJoind>
              Owner of Groups:
              {post.userInfo.registeredGroups.map((group) => {
                return (
                  <> {groups.find((groupe) => groupe._id === group).name}, </>
                );
              })}
            </GroupsJoind>
          )}
        </UserDetails>
      </UserInfo>
      <PostConent>{post.status}</PostConent>
      {post.media.length > 0 && (
        <Media>
          {post.media.map((m) => {
            if (m.type === "img")
              return (
                <Image cloudName="doc7plec9" publicId={m.url}>
                  <Transformation
                    rawTransformation="h_400,w_1340,c_fill,r_10"
                    // radius="50"
                    // crop="crop"
                    loading="lazy"
                    background="white"
                    y="60"
                    x="80"
                  />
                </Image>
              );
          })}
          <ImageBar>
            <IconWrapper>
              <IconeText >
                {!post.likeBy.includes(logInUserId) ? "Like" : "Liked by you"}
              </IconeText>
              <AiFillLike
                size={25}
                fill={
                  !post.likeBy.includes(logInUserId) ? "#5890ff" : "#15be89"
                }
                onClick={() => handleLike()}
              />
              <div
                style={{
                  marginLeft: "5px",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {post.likeBy.length}
              </div>
            </IconWrapper>
            <IconWrapper>
              <IconeText>
              {!post.userInfo.followerIds.includes(logInUserId) ? "Follow" : "Unfollow"}
              </IconeText>
              {post.userInfo.followerIds.includes(logInUserId) ? (
                <RiUserUnfollowFill size={25} fill="#15be89"  
                onClick={() => handleUnfollow()}/>
              ) : (
                <RiUserFollowFill size={25} fill="#5890ff"
                onClick={() => handleFollow()}/>
                
              
              )}
            </IconWrapper>
            <IconWrapper>
              <IconeText>
                {!friendOfLoginUser
                  ? "Friend requset"
                  : "unFriend"}
              </IconeText>
              <FaUserFriends
              onClick = {() => {
                if(friendOfLoginUser)
                  handleFriendsRequest("pull");
                else handleFriendsRequest("push")}}
                size={25}
                fill={
                  friendOfLoginUser
                    ? "#15be89"
                    : "#5890ff"
                }
              />
            </IconWrapper>
            <IconWrapper>
              <IconeText>
                Comments
              </IconeText>
              <MdOutlineInsertComment size={25} fill="#5890ff" />
            </IconWrapper>
          </ImageBar>
        </Media>
      )}
    </Container>
  );
};
const Container = styled.div`
  margin-left: 40px;
`;
const UserInfo = styled.div`
  display: flex;
`;
const Avatar = styled.div``;
const UserDetails = styled.div``;
const Name = styled.div`
  padding: 10px;
`;
const TimeStamp = styled.div`
  padding-left: 10px;
  opacity: 0.6;
`;
const GroupsOwner = styled.div`
  font-size: 0.9em;
  padding: 10px;
`;
const GroupsJoind = styled.div`
  font-size: 0.9em;
  padding-left: 10px;
`;

const Media = styled.div`
  width: 80%;
`;
const ImageBar = styled.div`
  margin-top: 20px;
  border-top: 1px solid lightgray;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-left: 10%;
  padding-top: 2%;
`;
const PostConent = styled.div`
  font-size: 1.3em;
  /* font-weight: bold; */
  padding: 40px 20px;
`;
const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const IconeText = styled.div`
  margin: 8px;
  margin-top: 8px;
  align-items: center;
  opacity: .7;
  display: flex;
`;
export default Post;
