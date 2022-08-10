import { createContext, useReducer } from "react";

const initialState = {
    status:"idel",
    groups: [],
    friens:[],
}
export const UserContext = createContext(null);

//th reducer for handleing the Users actions
const reducer = (state, action) => {
    switch (action.type) {
        case "value":
            
            break;
    
        default:
            break;
    }
}

export const UserProvider = ({children}) => {
    const [state, dispathcer] = useReducer(reducer,initialState)

    return (
        <UserContext.Provider value={{
            state,
            actions:{}
        }}>
            {children}
        </UserContext.Provider>
    )
}