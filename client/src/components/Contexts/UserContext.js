import { useEffect } from "react";
import { createContext, useReducer } from "react";

const initialState = {
  _id: null,
  status: "idel",
  groups: [],
  friens: [],
};
export const UserContext = createContext(null);

// reducer for handleing the Users actions
const reducer = (state, action) => {
  switch (action.type) {
    case "log-in":
      return {
        ...state,
        status: "login",
        _id: action.info._id,
        userInfo: { ...action.info },
        groups: [...action.info.groups],
        friends: [...action.info.friends],
      };
      break;

    default:
      break;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispathcer] = useReducer(reducer, initialState);
  const logIn = () => {
    fetch("/api/user", {
      method: "POST",
      headers: { "Contect-type": "application/json" },
      body: JSON.stringify({
        data: {
          userId: "mbayanirad",
          password: "123",
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("userContext", data);
        if (data.status === 200) {
          //Load data into reducer state
          dispathcer({
            type: "log-in",
            info: { ...data.data[0] },
          });
        }
      });
  };

  
  useEffect(() => {
    logIn();
  }, []);

  return (
    <UserContext.Provider
      value={{
        state,
        actions: { logIn },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
