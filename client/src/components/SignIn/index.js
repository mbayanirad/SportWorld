import styled from "styled-components";
import { GoogleLogin } from "@react-oauth/google";
import ski from "../../assets/Login/ski.jpg";
import ski2 from "../../assets/Login/ski2.jpg";
import ski3 from "../../assets/Login/ski3.jpg";
import camping from "../../assets/Login/camping.jpg";
import cycling from "../../assets/Login/cycling.jpg";
import cycling3 from "../../assets/Login/cycling3.jpg";
import fitness from "../../assets/Login/fitness.jpg";
import fitness2 from "../../assets/Login/fitness2.jpg";
import football from "../../assets/Login/football.jpg";
import hicking from "../../assets/Login/hicking.jpg";
import hicking2 from "../../assets/Login/hicking2.jpg";
import running from "../../assets/Login/running.jpg";
import swimming from "../../assets/Login/swimming.jpg";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import SignUp from "./SignUp";

const imgsrc = [
  ski,
  ski2,
  ski3,
  camping,
  cycling,
  cycling3,
  fitness,
  fitness2,
  football,
  hicking,
  hicking2,
  running,
  swimming,
];

const SignIn = () => {
  const [currentImage, setCurrentImage] = useState(null);
  const [signUp, setSignUp] = useState(false);
  useEffect(() => {
    setCurrentImage(imgsrc[Math.floor(Math.random() * imgsrc.length)]);
    const intervalId = setInterval(() => {
      setCurrentImage(imgsrc[Math.floor(Math.random() * imgsrc.length)]);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <Container>
      {signUp && <SignUp setSignUp={setSignUp}/>}
    <SingInForm  style={{ 
        opacity: signUp ?".3":"1",
        pointerEvents: signUp ? "none":""}} >
        <Img src={currentImage !== null ? currentImage : running} />
        <div>
          <Name>Sport World</Name>
          <Des>Connect with Sport's frinds and Groups around you</Des>
          <Form_Wrapper>
            <Form>
              <Input type="text" placeholder="User id or Email" required />
              <Input type="password" placeholder="Password" required />
              <Login type="submit" value="Log In" />
              <Forgotpsw to="/">Forgot Password?</Forgotpsw>
              <Divider />
            </Form>
            <CreatAccount >
              
              <CreatAccountBtn onClick={(ev)=>{
                ev.preventDefault();
                setSignUp(true)}}> Create new account</CreatAccountBtn>
              <div>
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  shape="circle"
                  logo_alignment="center"
                  />
              </div>
            </CreatAccount>
          </Form_Wrapper>
        </div>
      </SingInForm>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  /* border: 2px solid red; */
  height: 98vh;
  background-image: url("../assets/backGround.jpg");
  background-color: #e9ebee;
`;
const SingInForm = styled(Container)``

const Img = styled.img`
  width: 850px;
  min-width: 850px;
  max-width: 74%;
`;
const Name = styled.h1`
  text-align: center;
  color: #5890ff;
  font-weight: bold;
`;
const Des = styled.h1`
  margin-left: 15px;
`;

const Form_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Form = styled.form`
  background-color: white;
  min-width: 60%;
  max-width: 90%;
  padding: 30px 10px 10px 10px;

  border: none;
  border-radius: 2%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;
const CreatAccount = styled(Form)`
  padding: 0px 10px 30px 10px;
`
const Input = styled.input`
  width: 250px;
  height: 30px;
  margin: 10px 5px;
`;

const Login = styled(Input)`
  background: #5890ff;
  font-size: 1.3em;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  color: white;
  height: 40px;
  margin-bottom: 20px;
  &:hover{
  background: #9288ff;
    
  }
`;

const Divider = styled.div`
  border: 1px solid lightgray;
  width: 80%;
  margin: 10px 0;
`;

const Forgotpsw = styled(NavLink)`
  text-decoration: none;
  color: #5890ff;

`;

const CreatAccountBtn = styled.button`
  background: #15be89;
  color: white;
  border: none;
  width: 150px;
  height: 30px;
  border-radius: 5px;
  margin: 10px 0;
  &:hover{
  background: #99be62;

  }
`;
export default SignIn;
