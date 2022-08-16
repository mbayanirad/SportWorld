import { useEffect } from "react";
import { createContext, useReducer } from "react";

const initialState = {
  logInUserId: null,
  status: "idel",
  allUserInfo: [],
  logInUserInfo: {},
};
export const UserContext = createContext(null);

// reducer for handleing the Users actions
const reducer = (state, action) => {
  console.log("user-action", action);
  console.log("user-state", state);

  switch (action.type) {
    case "log-in":
      return {
        ...state,
        status: "login",
        logInUserId: action.info._id,
        logInUserInfo: { ...action.info },
      };
    case "registere-New-User": {
      return {
        ...state,
        status: "NewUser",
        logInUserId: action.info._id,
        logInUserInfo: { ...action.info },
      };
    }
    case "get-all-users": {
      return {
        ...state,
        status: "getAllUsers",
        allUserInfo: [...action.users],
      };
    }
    case "log-out":
      return { ...initialState };
      break;
    case "update-follow": {
      const newState = { ...state };
      if (action.data.method === "pull") {
        //delete current user id from followers's specific user
        let index = newState.allUserInfo
          .find((user) => user._id === action.data.userId)
          .followerIds.indexOf(newState.logInUserId);
        newState.allUserInfo
          .find((user) => user._id === action.data.userId)
          .followerIds.splice(index, 1);
        //delete specific user id from followingIds current user
        index = newState.logInUserInfo.followingIds.indexOf(action.data.userId);
        newState.logInUserInfo.followingIds.splice(index, 1);
      } else {
        newState.allUserInfo
          .find((user) => user._id === action.data.userId)
          .followerIds.push(newState.logInUserId);
        newState.logInUserInfo.followingIds.push(action.data.userId);
      }
      return {
        status: "updateUserfollow",
        ...newState,
      };
      
    }
    case "update-user-friends":{
      const newState = {...state};
      if (action.data.method === "pull") {
        //delete current user id from Frinds of specific user
        let index = newState.allUserInfo
          .find((user) => user._id === action.data.userId)
          .friends.indexOf(newState.logInUserId);
        newState.allUserInfo
          .find((user) => user._id === action.data.userId)
          .friends.splice(index, 1);
        //delete specific user id from friends of current user
         index = newState.logInUserInfo
          .friends.indexOf(action.data.userId);
          newState.logInUserInfo
          .friends.splice(index, 1)      
        } else {
        //push current user info frinds of specific user
        newState.allUserInfo
          .find((user) => user._id === action.data.userId)
          .friends.push(newState.logInUserId);
        //push specific user info frinds of current user
          newState.logInUserInfo
          .friends.push(action.data.userId);
      }
      return {
        status: "updateUserFriends",
        ...newState,
      };

    }
    default:
      break;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //get all users info from db and push on state
  const getAllUserInfo = () => {
    try {
      fetch("/api/users/info")
        .then((res) => res.json())
        .then((parseRes) => {
          if (parseRes.status === 200) {
            dispatch({
              type: "get-all-users",
              users: parseRes.data,
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  //insert new user to db and update state
  const registerNewUser = (userInfo) => {
    try {
      return fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userInfo),
      })
        .then((res) => res.json())
        .then((parseRes) => {
          if (parseRes.status === 200) {
            dispatch({
              type: "registere-New-User",
              info: parseRes.data,
            });
            return true;
          }
          return false;
        });
    } catch (err) {
      console.log(err);
    }
  };
  //logIn by userId or email and update state
  const logIn = (data) => {
    return fetch("/api/user/logIn", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        data: {
          userId: data.userId,
          password: data.password,
        },
      }),
    })
      .then((res) => res.json())
      .then((parseRes) => {
        if (parseRes.status === 200) {
          //Load data into reducer state
          dispatch({
            type: "log-in",
            info: { ...parseRes.data },
          });
          return "success";
        } else if (parseRes.status === 401) return "passwordNotMatch";
        return "idNotMatch";
      });
  };
  const logOut = () => {
    dispatch({
      type: "log-out",
    });
  };

  const updateUserFollow = (data) => {
    try {
      return fetch("/api/user/updatefollow", {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((parseRes) => {
          if (parseRes.status === 200) {
            dispatch({
              type: "update-follow",
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
  const updateFriends = (data) => {
    try {
      return fetch("/api/users/updateFriends",{
        method:"PATCH",
        headers:{"Content-type": "application/json"},
        body:JSON.stringify(data)})
        .then(res => res.json())
        .then(parseRes => {
          if(parseRes.status === 200){
            dispatch({
              type: "update-user-friends",
              data: data
            })
            return true
          }
          return false;
        })
      
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <UserContext.Provider
      value={{
        state,
        actions: {
          logIn,
          registerNewUser,
          getAllUserInfo,
          logOut,
          updateUserFollow,
          updateFriends
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
