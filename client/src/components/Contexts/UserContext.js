import { useEffect } from "react";
import { createContext, useReducer } from "react";

const initialState = {
  logInUserId: null,
  status: "idel",
  allUserInfo:[],
  logInUserInfo:{}
};
export const UserContext = createContext(null);

// reducer for handleing the Users actions
const reducer = (state, action) => {
  console.log("user-action",action)
  switch (action.type) {
    
    case "log-in":
      return {
        ...state,
        status: "login",
        logInUserId: action.info._id,
        logInUserInfo:{...action.info}
      };
      case 'registere-New-User':{
        return {
          ...state,
          status: "NewUser",
          logInUserId: action.info._id,
          logInUserInfo:{...action.info}
        };
      }
      case "get-all-users": {
        return {
          ...state,
          status: "getAllUsers",
          allUserInfo:[...action.users]
        }
      }
      case "log-out":
        return {...initialState}
      break;

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
      .then(res => res.json())
      .then(parseRes => {
        if(parseRes.status === 200){
          dispatch({
            type: "get-all-users",
            users:parseRes.data
          })
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
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
        console.log("userContext logIn", parseRes);
        if (parseRes.status === 200) {
          //Load data into reducer state
          dispatch({
            type: "log-in",
            info: { ...parseRes.data },
          });
          return "success";
        }else if(parseRes.status === 401) return "passwordNotMatch";
        return "idNotMatch";
      });
  };
  const logOut = () => {
    dispatch({
      type:"log-out"
    })
  }
  
  // useEffect(() => {
  //   logIn();
  // }, []);

  return (
    <UserContext.Provider
      value={{
        state,
        actions: { 
          logIn,
          registerNewUser,
          getAllUserInfo,
          logOut},
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
