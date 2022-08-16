import styled from "styled-components";
import Post from "./Post";


const AllPosts = ({allPosts, action}) => {
    console.log("all posts page", allPosts);
    // if(postState.AllPosts.length ) return <div>loading...</div>
    return(
        <>
            {allPosts.map(post =>{
                return (
                <>
                    <Post post = {post} action = {action}/>
                    <Divider/>
                </>)

            })
                }
        </>)
}

const Divider = styled.div`
    border: 1px solid lightgray;
    margin: 20px 0;
    padding: 10px;
    background-color: lightgray;
`

export default AllPosts;