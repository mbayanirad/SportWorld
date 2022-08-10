import { createContext, useReducer } from "react";

const initialState = {
    status:"idel",
    groups: [],
    members:[], 
    activeUser:null //this key change if a user make login 
}
export const GroupsContext = createContext(null);
//th reducer for handleing the Groups actions
const reducer = (state, action) => {
    switch (action.type) {
        case "value":
            
            break;
    
        default:
            break;
    }
}

export const GroupsProvider = ({children}) => {
    const [state, dispathcer] = useReducer(reducer,initialState)

    return (
        <GroupsContext.Provider value={{
            state,
            actions:{}
        }}>
            {children}
        </GroupsContext.Provider>
    )
}