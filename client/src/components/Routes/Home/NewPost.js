import { useContext, useState } from "react";
import styled, { keyframes } from "styled-components";
import { PostContext } from "../../Contexts/PostContext";


const NewPost = ({userId}) => {

  const {actions:{newPost}} = useContext(PostContext)

  //inisial value fo post collection
  const initialState = {
    userId: userId,
    timeStamp: "",
    likeBy:[],
    reSport:[],
    status:[],
    media:[]
  }
  const [previewSource, setPreviewSource] = useState(initialState);
  const [upLoadPost, setupLoadPost] = useState(false);

  const handleFileInputChange = (ev) => {
    //just get first file that selected if we have multifile
    const file = ev.target.files[0]; 
    //prepar imgsrc from file
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () =>{
      const newTimestamp = await new Date().toISOString()
        setPreviewSource({
          ...previewSource,
          timeStamp:newTimestamp,
          media:[...previewSource.media,
            {url:reader.result,
            type:"img"}]});
    }
  }
  const handelStatus = async(evt) => {
    evt.preventDefault();
    setupLoadPost(true);
    const resualt = await newPost(previewSource);
    setupLoadPost(false);
    if (resualt) setPreviewSource(initialState);
    
  };
  return (
    <Wrapper>
      <StatusContainer onSubmit={(ev) => handelStatus(ev)}>
        <PostText
          placeholder="type here"
          typel="text"
          value={previewSource.status}
          onChange={(ev) => setPreviewSource({
            ...previewSource,status:ev.target.value
          })}
          maxLength="280"
          charnum={previewSource.status.length}
        />

        <CharacterNum>{350 - previewSource.status.length}</CharacterNum>
        <BtnWrapper>
          <Inpute type="file" onChange={handleFileInputChange} />

          <Button type="submit"  disabled = {upLoadPost? true:false}>
            {upLoadPost && (
            <Loading>
            <div></div>
            <div></div>
            </Loading>
          )}
            Status
          </Button>
        </BtnWrapper>
      </StatusContainer>
      {previewSource.media[0]?.url && (
        <Img
          src={previewSource.media[0].url}
        />
      )}
      <Divider/>
      <AllpostWrapper>
        
      </AllpostWrapper>
    </Wrapper>
  );
};

const AllpostWrapper = styled.div`

`
const Img = styled.img`
  width: 70%;
  height: 400px;
  border-radius: 10px;
  object-fit: cover;
  background-size: cover;
`
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: space-between;
  align-items: center;
  width: 20%;
  align-content: center;
  input[type="file"]::file-selector-button {
    border: none;
    padding: 0.2em 0.4em;
    width: 99%;
    color: white;
    height: 100%;
    border-radius: 0.2em;
    background-color: #15be89;
    transition: 1s;
  }

  input[type="file"]::file-selector-button:hover {
    background-color: #009ed9;
    /* border: 2px solid #00cec9; */
  }
`;
const StatusContainer = styled.form`
  position: relative;
  display: flex;
  width: 80%;
  height: 100%;
`;
const Inpute = styled.input`
  position: relative;
  display: block;
  width: 60%;
  height: 35px;
  border-color: transparent;
  font-family: "Poppins", Arial, Helvetica, sans-serif;

  border-radius: 4px;
  /* color: white; */
  margin-left: 5%;
  margin-top: 10%;
  /* background: #15be89; */
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 2%;
  /* position: absolute; */
  /* top: 30%; */
  /* left: 0%; */
`;
const PostText = styled.textarea`
  width: 85%;
  height: 150px;
  min-height: 150px;
  border: none;
  position: relative;
  word-wrap: break-word;
  word-break: break-all;
  /* text-decoration: none; */
  /* box-decoration-break: clone; */
  /* margin-left: 65px; */
  margin-top: 15px;
  padding: 20px;
  margin-bottom: 30px;
  outline: none;
  resize: none;
  box-shadow: 20px 10px 20px 5px;
  border-radius: 10px;
  color: ${(p) =>
    p.charnum > 90 ? (p.charnum < 180 ? "orange" : "red") : "black"};
`;
const CharacterNum = styled.span`
  position: absolute;
  right: 20%;
  top: 70%;
  opacity: 0.5;
`;
const Button = styled.button`
  position: relative;
  display: block;
  width: 60%;
  height: 35px;
  border-color: transparent;
  font-family: "Poppins", Arial, Helvetica, sans-serif;

  border-radius: 4px;
  color: white;
  margin-left: 5%;
  margin-top: 10%;
  background: #15be89;

  &:hover {
    background: #009ed9;
  }

  /* background: #363292; */
  color: #fff;
  cursor: pointer;
  font-weight: 600;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
const Divider = styled.div`
  border: 1px solid lightgray;
  margin: 15px 0px;
  padding: 0px;
  width: 100%;
`;

const ldsRipple = keyframes`
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
`;
const Loading = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  top: -21px;

  div {
    position: absolute;
    border: 4px solid #fff;
    opacity: 1;
    border-radius: 50%;
    animation: ${ldsRipple} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;

    &:nth-child(2) {
      animation-delay: -0.5s;
    }
  }
`;
export default NewPost;
