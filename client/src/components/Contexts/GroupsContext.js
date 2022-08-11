import { useEffect } from "react";
import { createContext, useReducer } from "react";

const initialState = {
    status:"idel",
    groups: [],
    activeUser:null //this key change if a user make login 
}
export const GroupsContext = createContext(null);
//th reducer for handleing the Groups actions
const reducer = (state, action) => {
    switch (action.type) {
        case "get-all-group":
            return {
                ...state,
                status:'dataLoded',
                groups:[...action.groups]
                }
            
            break;
    
        default:
            break;
    }
}

export const GroupsProvider = ({children}) => {
    const [state, dispathcer] = useReducer(reducer,initialState)
    const getAllGroups = () => {
         fetch('/api/AllGroups')
        .then(res => res.json())
        .then(data => {
            // console.log(data.status);
            // console.log(data.data);
            // console.log("----------------------")

           if(data.status === 200 ) {
            dispathcer({
                type:"get-all-group",
                groups:[...data.data]});}
        })
    }
    useEffect(() => {
        getAllGroups()

    }, []);
    return (
        <GroupsContext.Provider value={{
            state,
            actions:{getAllGroups}
        }}>
            {children}
        </GroupsContext.Provider>
    )
}