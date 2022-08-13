import { useEffect } from "react";
import { createContext, useReducer } from "react";

const initialState = {
  _logInUserid: null,
  status: "idel",
  allUserInfo:[],
  logInUserInfo:{
    registeredGroups: [],
    myGroups:[],
    friens: [],
    followingIds:[],
    followerIds:[]
  }
};
export const UserContext = createContext(null);

// reducer for handleing the Users actions
const reducer = (state, action) => {
  switch (action.type) {
    case "log-in":
      return {
        ...state,
        status: "login",
        logInUserid: action.info._id,
        logInUserInfo:{
          registeredGroups: [...action.info.registeredGroups],
          myGroups:[...action.info.myGroups],
          friends: [...action.info.friends],
          followingIds:[...action.info.followingIds],
          followerIds:[...action.info.followerIds] 
        }
      };
      case 'registere-New-User':{
        return {
          ...state,
          status: "NewUser",
          logInUserid: action.info._id,
          logInUserInfo:{
            registeredGroups: [...action.info.registeredGroups],
            myGroups:[...action.info.myGroups],
            friends: [...action.info.friends],
            followingIds:[...action.info.followingIds],
            followerIds:[...action.info.followerIds] 
          }
        };
      }
      break;

    default:
      break;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const registerNewUser = (userInfo) => {
    try {
     return fetch('/api/user/register',{
        method:'POST',
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(userInfo)
      }).then(res => res.json())
      .then(parseRes => {
        if(parseRes.status === 200){
          dispatch({
            type:"registere-New-User",
            info:parseRes.data
          })
          return true;}
        return false;
      })      
    } catch (err) {
      console.log(err)
    }
  }
  const logIn = (data) => {
    fetch("/api/user/logIn", {
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
      .then((data) => {
        console.log("userContext", data);
        if (data.status === 200) {
          //Load data into reducer state
          dispatch({
            type: "log-in",
            info: { ...data.data[0] },
          });
        }
      });
  };

  
  // useEffect(() => {
  //   logIn();
  // }, []);

  return (
    <UserContext.Provider
      value={{
        state,
        actions: { logIn,registerNewUser },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
