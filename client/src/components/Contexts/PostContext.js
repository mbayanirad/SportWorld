import { createContext } from "react";
import { UserContext } from "./UserContext";
const initialState = {
    status:"idl",
    allPosts:[]
}
export const PostContext = createContext();
const reducer = (state, action) => {
    switch (action.type) {
        case "value":
            
            break;
    
        default:
            break;
    }
} 

export const PostProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <UserContext.Provider value={{
            state
        }}>
            {children}
        </UserContext.Provider>

    )
}