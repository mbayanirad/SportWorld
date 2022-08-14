import { createContext, useReducer } from "react";
const initialState = {
    status:"idl",
    allPosts:[]
}
export const PostContext = createContext();
const reducer = (state, action) => {
    switch (action.type) {
        case "new-post":{
            const newState = {...state};
            newState.allPosts.unshift(action.newPost)
            return {...newState}
        }
            
            break;
    
        default:
            break;
    }
} 

export const PostProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const newPost = (data) => {
        console.log("new post reducer", data)
        return fetch("/api/post/new",{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(data)
        }).then(res => res.json())
        .then(parseRes => {
            console.log("aggregateresult",parseRes);
            if(parseRes.status === 200){
                dispatch({
                    type:"new-post",
                    newPost:parseRes.data
                })
                return true;
            }
            return false;

        })
    }
    return (
        <PostContext.Provider value={{
            state,
            actions:{newPost}
        }}>
            {children}
        </PostContext.Provider>

    )
}