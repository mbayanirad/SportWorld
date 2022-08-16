import { createContext, useReducer } from "react";
const initialState = {
  status: "idl",
  allPosts: [],
};
export const PostContext = createContext();
const reducer = (state, action) => {
  // console.log("post-action",action);
  // console.log("post-state",state);

  switch (action.type) {
    case "new-post": {
      const newState = { ...state };
      newState.allPosts.unshift(action.newPost);
      return { ...newState };
    }
    case "get-all-posts": {
      return { ...state, status: "getAllPosts", allPosts: action.allPosts };
    }
    case "update-post-like": {
      const newState = { ...state };
      if (action.data.method === "pull") {
        const index = newState.allPosts
          .find((post) => post._id === action.data.postId)
          .likeBy.indexOf(action.data.userId);
        newState.allPosts
          .find((post) => post._id === action.data.postId)
          .likeBy.splice(index, 1);
      } else {
        newState.allPosts
          .find((post) => post._id === action.data.postId)
          .likeBy.push(action.data.userId);
      }
      return {
        status: "updatePstLike",
        ...newState,
      };
    }

    case "update-post-userinfo-follow":
      {
        const newState = { ...state };
        if (action.data.method === "pull") {
          //delete current user id from followers's spcyfied your
          let filter = newState.allPosts
            .filter((post) => {return post.userId === action.data.userId})
            for(let i = 0 ; i < filter.length ; i++){
              filter[i].userInfo.followerIds.forEach((id, index)=>{
                if(id === action.data.loginUserId){
                  filter[i].userInfo.followerIds.splice(index, 1);
                }
              })
            }
            // .userInfo.followerIds.filter(followerId => followerId !== action.data.loginUserId);
            newState.allPosts = [
              ...newState.allPosts
            .filter((post) => {return post.userId !== action.data.userId}),
            ...filter
            ]
        } else {
          newState.allPosts
            .filter((post) => {return post.userId === action.data.userId})
            .forEach(filterPost => {
              filterPost.userInfo.followerIds.push(action.data.loginUserId)
            })
        }
        return {
          status: "updatepostfollow",
          ...newState,
        };
      }
      case "update-post-userinfo-friends":
        {
          const newState = { ...state };
          if (action.data.method === "pull") {

            //delete current user id from frinds of spcyfied your
            let filter = newState.allPosts
              .filter((post) => {return post.userId === action.data.userId})
              for(let i = 0 ; i < filter.length ; i++){
                filter[i].userInfo.friends.forEach((id, index)=>{
                  if(id === action.data.loginUserId){
                    filter[i].userInfo.friends.splice(index, 1);
                  }
                })
              }

              newState.allPosts = [
                ...newState.allPosts
              .filter((post) => {return post.userId !== action.data.userId}),
              ...filter
              ]
          } else {
            
            newState.allPosts
              .filter((post) => {return post.userId === action.data.userId})
              .forEach(filterPost => {
                filterPost.userInfo.friends.push(action.data.loginUserId)
              })

          }
          return {
            status: "updatepostfriends",
            ...newState,
          };
        }

      break;

    default:
      break;
  }
};

export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  //insert new post to db and update state with BE resonse
  const newPost = (data) => {
    return fetch("/api/post/new", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((parseRes) => {
        if (parseRes.status === 200) {
          dispatch({
            type: "new-post",
            newPost: parseRes.data,
          });
          return true;
        }
        return false;
      });
  };

  //fetch all Posts from db and update state
  const getAllPosts = () => {
    return fetch("/api/posts/all")
      .then((res) => res.json())
      .then((parseRes) => {
        if (parseRes.status === 200) {
          dispatch({
            type: "get-all-posts",
            allPosts: parseRes.data,
          });
          return true;
        }
        return false;
      });
  };

  //update like or dislike of a specify post
  const updatePostLike = (data) => {
    try {
      return fetch("/api/post/updatLike", {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((parseRes) => {
          if (parseRes.status === 200) {
            dispatch({
              type: "update-post-like",
              data: data,
            });
            return true;
          }
          return false;
        });
    } catch (err) {
      console.log(err);
    }
  };
  const updatePostUserInfoFollow = (data) => {
    dispatch({
      type: "update-post-userinfo-follow",
      data: data,
    });
  };
  const updatePostUserInfoFriends = (data) => {
    dispatch({
      type: "update-post-userinfo-friends",
      data: data,
    });
  };
  return (
    <PostContext.Provider
      value={{
        state,
        actions: {  
          newPost,
          getAllPosts,
          updatePostLike,
          updatePostUserInfoFollow,
          updatePostUserInfoFriends
        },
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
